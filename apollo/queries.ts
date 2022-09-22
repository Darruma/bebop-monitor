import { gql } from "@apollo/client";

export const LOAD_ORDERS = gql`
    query loadOrders {
        orders(first:100, orderBy: blockNumber, orderDirection: desc) {
            id
            blockNumber
            maker {
                id
            }
            taker {
                id
            }
            baseAmounts
            quoteAmounts
            baseTokens(first:100) {
                id
                symbol
                decimals
            }
            quoteTokens(first:100) {
                id
                symbol
                decimals
            }
        }
    }
`
