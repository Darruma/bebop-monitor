
import styled from "styled-components"
import { formatTokenValue } from "../utils"
import { DataText, DataWrapper, ItemWrapper, TitleText } from "./Events"

const VolumesWrapper = styled.div`
    color: white;
    background-color: #43455C;
    margin-top: 2.5rem;
    border-radius: 1rem;
`
export function Volumes({ volumes }) {
    return <VolumesWrapper>
        {volumes.map(v  => {
            const amount = v.amount / Math.pow(10, v.token.decimals)
            const formattedTokenAmount = formatTokenValue(amount)
            const value = (amount * 0.1).toLocaleString()
            return (
            <ItemWrapper>
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