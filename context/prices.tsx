import { createContext, useContext, useEffect, useState } from 'react';

interface PricesContextData {
    prices: any
    setPrices: any 
}
const pricesContextDefaultData: PricesContextData = {
    prices: {},
    setPrices: () => null
}
export const PricesContext = createContext<PricesContextData>(pricesContextDefaultData)

export function Provider({ children }) {
    const [prices, setPrices] = useState({})
    useEffect(() => {
        // Load all tokens from subgraph
        // Load all prices from defillama api
    }, [])
    return (<PricesContext.Provider value={{ prices, setPrices }}>
        {children}
    </PricesContext.Provider>)

}
export const usePrices = () => {
    return useContext(PricesContext).prices
}