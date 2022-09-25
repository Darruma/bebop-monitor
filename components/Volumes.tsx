
import styled from "styled-components"
import { formatTokenValue, formatValue } from "../utils"
import { DataText, DataWrapper, ItemWrapper, TitleText } from "./Events"

const VolumesWrapper = styled.div`
    color: white;
    background-color: #43455C;
    margin: 0 auto;
    width: fit-content;
    margin-top: 2.5rem;
    border-radius: 1rem;
`
export function Volumes({ volumes, prices }) {

    return <VolumesWrapper>
        {volumes.map(v => {
            const amount = v.amount / Math.pow(10, v.token.decimals)
            return {
                id: v.id,
                amount,
                value: amount * prices[v.id.split("-")[1]],
                symbol: v.token.symbol
            }
        }).sort((a, b) => b.value - a.value).map(v => {
            const formattedTokenAmount = formatTokenValue(v.amount)
            const formattedValue = formatValue(v.value)
            return (
                <ItemWrapper key={v.id}>
                    <DataWrapper>
                        <TitleText>Token</TitleText>
                        <DataText>{v.symbol}</DataText>
                    </DataWrapper>
                    <DataWrapper>
                        <TitleText>Amount</TitleText>
                        <DataText>{formattedTokenAmount}</DataText>
                    </DataWrapper>
                    <DataWrapper>
                        <TitleText>Value</TitleText>
                        <DataText>${formattedValue}</DataText>
                    </DataWrapper>

                </ItemWrapper>)
        })}
    </VolumesWrapper>
}