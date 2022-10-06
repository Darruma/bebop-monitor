import { useMemo, useState } from "react"
import styled from "styled-components"
import { usePolledQuery } from "../apollo/hooks"
import { LOAD_ORDERS } from "../apollo/queries"
import { OrderQueryData } from "../apollo/types"
import { Title } from "../components/Events"
import { Orders } from "../components/Orders"

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
export const FilterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 2rem;
    color: white;
    margin: 0 auto;
    width: 50%
`
export const Filter = styled.input`
`
export const FilterItem = styled.div`
    margin: 1rem;
`
enum OrdersFilter {
    None,
    OneToOne,
    OneToMany,
    ManyToOne
}

function OrderPage() {
    const query = usePolledQuery(LOAD_ORDERS)
    const { data, loading }: {data: OrderQueryData, loading: boolean} = query
    const [ordersFilter, setOrdersFilter] = useState<OrdersFilter>(OrdersFilter.None)
    const orders = useMemo(() => {
        if (data) {
            return data.orders.filter(order => {
                if (ordersFilter == OrdersFilter.None) {
                    return order
                }
                if (ordersFilter == OrdersFilter.OneToOne) {
                    return order.quoteTokens.length == order.baseTokens.length
                }
                if (ordersFilter == OrdersFilter.OneToMany) {
                    return order.baseTokens.length < order.quoteTokens.length
                }
                if (ordersFilter == OrdersFilter.ManyToOne) {
                    return order.baseTokens.length > order.quoteTokens.length
                }
            })
        }
        else {
            return []
        }
    }, [ordersFilter, data])
    return (
        <div>
            <Title>
                {loading ? "Fetching Latest Orders" : "Latest Orders"}
            </Title>
            <FilterWrapper>
                <FilterItem>
                    <Filter id={"one_to_one"} type="checkbox"
                        checked={ordersFilter == OrdersFilter.OneToOne}
                        onChange={() => {
                            if (ordersFilter == OrdersFilter.OneToOne) {
                                setOrdersFilter(OrdersFilter.None)
                            } else {
                                setOrdersFilter(OrdersFilter.OneToOne)
                            }

                        }} />
                    <label htmlFor={"one_to_one"}>One To One</label>
                </FilterItem>
                <FilterItem>
                    <Filter id={"one_to_many"}
                        checked={ordersFilter == OrdersFilter.OneToMany}
                        type="checkbox" name="a"
                        onChange={(e) => {
                            if (ordersFilter == OrdersFilter.OneToMany) {
                                setOrdersFilter(OrdersFilter.None)
                            } else {
                                setOrdersFilter(OrdersFilter.OneToMany)
                            }
                        }}
                    />
                    <label htmlFor={"one_to_many"}>One To Many</label>

                </FilterItem>
                <FilterItem>
                    <Filter id={"many_to_one"} checked={ordersFilter == OrdersFilter.ManyToOne}
                        type="checkbox" name="a"
                        onChange={() => {
                            if (ordersFilter == OrdersFilter.ManyToOne) {
                                setOrdersFilter(OrdersFilter.None)
                            } else {
                                setOrdersFilter(OrdersFilter.ManyToOne)
                            }
                        }}
                    />
                    <label htmlFor={"many_to_one"}>Many To One</label>
                </FilterItem>

            </FilterWrapper>

            <Orders orders={orders}></Orders>
        </div>
    )

}
export default OrderPage