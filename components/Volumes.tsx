
import styled from "styled-components"
import { formatTokenValue } from "../utils"
import { DataText, DataWrapper, ItemWrapper, TitleText } from "./Events"

const VolumesWrapper = styled.div`
    color: white;
    background-color: #43455C;
    margin-top: 2.5rem;
    border-radius: 1rem;
`
export function Volumes({ volumes, prices }) {
    
    return <VolumesWrapper>
        {volumes.map(v  => {
            const tokenAddress = v.id.split("-")[1]
            const amount = v.amount / Math.pow(10, v.token.decimals)
            const formattedTokenAmount = formatTokenValue(amount)
            const value = (amount * prices[tokenAddress]).toLocaleString()
            return (
            <ItemWrapper key={v.id}>
                <DataWrapper>
                    <TitleText>Token</TitleText>
                    <DataText>{v.token.symbol}</DataText>
                </DataWrapper>
                <DataWrapper>
                    <TitleText>Amount</TitleText>
                    <DataText>{formattedTokenAmount}</DataText>
                </DataWrapper>
                <DataWrapper>
                    <TitleText>Value</TitleText>
                    <DataText>${value}</DataText>
                </DataWrapper>

            </ItemWrapper>)
        })}
    </VolumesWrapper>
}