import styled from "styled-components"
import { usePolledQuery } from "../apollo/hooks"
import { LOAD_ORDERS } from "../apollo/queries"
import { ItemsWrapper, ItemWrapper, DataWrapper, DataText, TitleText } from "../components/Events"
import OrderInfo from "../components/OrderInfo"
import { ETHERSCAN_URL } from "../constants"
import { weiToEther } from "../utils"

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

function AccountLink({ id }) {
    return (
        <a style={{ textDecoration: 'underline' }} target="_blank" rel="noreferrer" href={`${ETHERSCAN_URL}/address/${id}`}>
            {id.substring(0, 7)}
        </a>
    )
}
function TxLink({ id }) {
    return (
        <a style={{ textDecoration: 'underline' }} target="_blank" rel="noreferrer" href={`${ETHERSCAN_URL}/tx/${id}`}>
            {id.substring(0, 7)}
        </a>
    )
}
function Orders() {
    const { data, loading, error } = usePolledQuery(LOAD_ORDERS)
    if (data) {
        return (<ItemsWrapper>
            {data.orders.map(o => {
                return (
                    <div>
                        <OrderWrapper>

                            <ItemWrapper>
                                <DataWrapper>
                                    <DataText><TxLink id={o.id} /></DataText>
                                    <TitleText>tx</TitleText>
                                </DataWrapper>
                                <DataWrapper>
                                    <DataText>{o.blockNumber}</DataText>
                                    <TitleText>block</TitleText>
                                </DataWrapper>
                                <DataWrapper>
                                    <DataText>
                                        <AccountLink id={o.taker.id} />
                                    </DataText>
                                    <TitleText>Taker</TitleText>
                                </DataWrapper>
                            </ItemWrapper>
                            <OrderInfo order={o}/>
                        </OrderWrapper>
                    </div>
                )
            })}
        </ItemsWrapper>)

    }
}
export default Orders