import styled from "styled-components"


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
function OrderInfo(props) {

    const baseTokens = props.order.baseTokens.slice().sort((a, b) => {
        return Number(a.id[0]) > Number(b.id[0])
    })
    const quoteTokens = props.order.quoteTokens.slice().sort((a, b) => {
        return Number(a.id[0]) > Number(b.id[0])
    })
    
    return <OrderInfoWrapper>
        <OrderInput>
            {baseTokens.map((bt, index) => {
                const amount = props.order.baseAmounts[index] / Math.pow(10, bt.decimals)
                return (<OrderData>
                    {amount.toLocaleString()} {bt.symbol}
                </OrderData>)
            })}
        </OrderInput>
        <OrderOutput>
            {quoteTokens.map((qt, index) => {
                const amount = props.order.quoteAmounts[index] / Math.pow(10, qt.decimals)
                return (<OrderData>
                    {amount.toLocaleString()} {qt.symbol}
                </OrderData>)
            })}
        </OrderOutput>
    </OrderInfoWrapper>
}

export default OrderInfo