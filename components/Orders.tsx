
import Link from "next/link"
import styled from "styled-components"
import { ItemsWrapper, ItemWrapper, DataWrapper, DataText, TitleText, Title } from "../components/Events"
import OrderInfo from "../components/OrderInfo"
import { ETHERSCAN_URL } from "../constants"
export const OrderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    width: min-content;
    background-color: #43455C;
    @media (max-width: 800px) {
        width: 95%
    }
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
`
function UserLink({ id }) {
    return (
        <Link href={`/user/${id}`} >
            <a style={{ textDecoration: 'underline' }}>
                {id.substring(0, 7)}
            </a>
        </Link>
    )
}
function TxLink({ id }) {
    return (
        <a style={{ textDecoration: 'underline' }} target="_blank" rel="noreferrer" href={`${ETHERSCAN_URL}/tx/${id}`}>
            {id.substring(0, 7)}
        </a>
    )
}
export function Order({ order }) {
    return ( <div>
        <OrderWrapper>

            <ItemWrapper>
                <DataWrapper>
                    <DataText><TxLink id={order.id} /></DataText>
                    <TitleText>Tx</TitleText>
                </DataWrapper>
                <DataWrapper>
                    <DataText>{order.blockNumber}</DataText>
                    <TitleText>Block</TitleText>
                </DataWrapper>
                <DataWrapper>
                    <DataText>
                        <UserLink id={order.taker.id} />
                    </DataText>
                    <TitleText>Taker</TitleText>
                </DataWrapper>
                <DataWrapper>
                    <DataText>
                        <UserLink id={order.maker.id} />
                    </DataText>
                    <TitleText>Maker</TitleText>
                </DataWrapper>
            </ItemWrapper>
            <OrderInfo order={order} />
        </OrderWrapper>
    </div>)
}
export function Orders({ orders }) {
    return (
        <ItemsWrapper>
            {orders.map(o => {
                return <Order order={o}/>
            })}
        </ItemsWrapper>
    )

}