
import styled from "styled-components"
import { formatTokenValue, formatValue } from "../utils"
import { DataText, DataWrapper, ItemsWrapper, ItemWrapper, TitleText } from "./Events"

const VolumesWrapper = styled.div`
    color: white;
    background-color: #43455C;
    margin: 0 auto;
    width: fit-content;
    margin-top: 2.5rem;
    min-width: 300px;
    border-radius: 1rem;
`
const VolumeItemWrapper = styled(ItemWrapper)`
    min-width: 150px
`
const VolumeDataWrapper = styled(DataWrapper)`
    @media (max-width: 800px) {
        min-width: auto;
    }
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
                <VolumeItemWrapper key={v.id}>
                    <VolumeDataWrapper>
                        <TitleText>Token</TitleText>
                        <DataText>{v.symbol}</DataText>
                    </VolumeDataWrapper>
                    <VolumeDataWrapper>
                        <TitleText>Amount</TitleText>
                        <DataText>{formattedTokenAmount}</DataText>
                    </VolumeDataWrapper>
                    <VolumeDataWrapper>
                        <TitleText>Value</TitleText>
                        <DataText>${formattedValue}</DataText>
                    </VolumeDataWrapper>
                </VolumeItemWrapper>)
        })}
    </VolumesWrapper>
}