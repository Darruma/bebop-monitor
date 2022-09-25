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

export const LOAD_USER_DATA = gql`
    query loadUserData($addr: ID!) {
        user(id: $addr) {
            id
            makerOrders(first: 10, orderBy: blockNumber, orderDirection: desc) {
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
                baseTokens(first:10) {
                    id
                    symbol
                    decimals
                }
                quoteTokens(first: 10) {
                    id
                    symbol
                    decimals
                }
            }
            takerOrders(first: 10, orderBy: blockNumber, orderDirection: desc) {
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
                baseTokens(first:10) {
                    id
                    symbol
                    decimals
                }
                quoteTokens(first: 10) {
                    id
                    symbol
                    decimals
                }
            }
            makerTokenVolumes(first: 17, orderBy: amount, orderDirection: desc) {
                id
                amount
                token {
                    id
                    symbol
                    decimals
                }
            }
            takerTokenVolumes(first: 17, orderBy: amount, orderDirection: desc) {
                id
                amount
                token {
                    id
                    symbol
                    decimals
                }
            }
        }
    } 
`
export const LOAD_TOKENS = gql`
    query loadTokens {
        tokens(first: 100) {
            id
        }
    }
`