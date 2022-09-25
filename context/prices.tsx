import { useQuery } from '@apollo/client';
import { createContext, useContext, useEffect, useState } from 'react';
import { LOAD_TOKENS } from '../apollo/queries';
import { LLAMA_API } from '../constants';

interface PricesContextData {
    prices: any
    setPrices: any 
}
const pricesContextDefaultData: PricesContextData = {
    prices: {},
    setPrices: () => null
}
export const PricesContext = createContext<PricesContextData>(pricesContextDefaultData)

export function PricesProvider({ children }) {
    const [prices, setPrices] = useState({})
    const { data, loading, error } = useQuery(LOAD_TOKENS)
    useEffect(() => {
        // Load all tokens from subgraph
        const queryString = data?.tokens.map(t => `ethereum:${t.id.split('-')[1]}`).join(",")
        const url = `${LLAMA_API}/prices/current/${queryString}`
        fetch(url).then(response => response.json()).then((result) => {
            let newPrices = {}
            Object.keys(result.coins).map(k => {
                newPrices[k.split(":")[1]] = result.coins[k].price
            })
            setPrices(newPrices)
        })
        // Load all prices from defillama api
    }, [data])
    return (<PricesContext.Provider value={{ prices, setPrices }}>
        {children}
    </PricesContext.Provider>)

}
export const usePrices = () => {
    return useContext(PricesContext).prices
}