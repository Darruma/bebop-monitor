import styled from "styled-components"
import Xarrow from "react-xarrows";
import { Order, Token } from "../apollo/types";

const OrderInfoWrapper = styled.div`
    display: flex;
    margin-bottom: 1rem;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`
const OrderInput = styled.div`
    width: 50%;
    text-align: center;
`
const OrderOutput = styled.div`
    width: 50%;
    text-align: center;
`
const OrderData = styled.div`
    font-size: 20px;
`
function sortTokens(tokens: Token[]) {
    return tokens.sort((a, b) => {
        const aID = Number(a.id.split("-")[0])
        const bID = Number(b.id.split("-")[0])
        return aID - bID
    })
}
interface OrderInfoProps {
    order: Order
}
function OrderInfo(props: OrderInfoProps) {
    const baseTokens = sortTokens(props.order.baseTokens.slice())
    const quoteTokens = sortTokens(props.order.quoteTokens.slice())
    let arrows;
    if (baseTokens.length >= quoteTokens.length) {
        arrows = baseTokens.map((bt, index) => {
            return <Xarrow
                key={index}
                startAnchor={"right"}
                endAnchor={"left"}
                start={`order-input-${props.order.id}-${index}`} end={`order-output-${props.order.id}`} />
        })
    }
    if (quoteTokens.length > baseTokens.length) {
        arrows = quoteTokens.map((bt, index) => {
            return <Xarrow
                key={index}
                startAnchor={"right"}
                endAnchor={"left"}
                start={`order-input-${props.order.id}`} end={`order-output-${props.order.id}-${index}`} />
        })
    }

    return <OrderInfoWrapper>
        <OrderInput>
            {baseTokens.map((bt, index) => {
                let outputId = (quoteTokens.length > baseTokens.length) ? `order-input-${props.order.id}` : `order-input-${props.order.id}-${index}`
                const amount = props.order.baseAmounts[index] / Math.pow(10, bt.decimals)
                return (<OrderData key={index}>
                    <span id={outputId}>
                        {amount.toLocaleString()} {bt.symbol}
                    </span>
                </OrderData>)
            })}
        </OrderInput>

        <OrderOutput>
            {quoteTokens.map((qt, index) => {
                let outputId = (quoteTokens.length <= baseTokens.length) ? `order-output-${props.order.id}` : `order-output-${props.order.id}-${index}`
                const amount = props.order.quoteAmounts[index] / Math.pow(10, qt.decimals)
                return (<OrderData key={index}>
                    <span id={outputId}>
                        {amount.toLocaleString()} {qt.symbol}
                    </span>
                </OrderData>)
            })}
        </OrderOutput>
        {arrows}
    </OrderInfoWrapper>
}

export default OrderInfo