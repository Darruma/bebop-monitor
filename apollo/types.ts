export interface OrderQueryData {
    orders: Order[]
}

export interface Order {
    id: string
    blockNumber: number
    baseAmounts: number[]
    quoteAmounts: number[]
    baseTokens: Token[]
    quoteTokens: Token[]
    maker: { id: string }
    taker: { id: string }
}

export interface Token {
    id: string
    symbol: string
    decimals: number
}

export interface UserType {
    makerOrders: Order[]
    takerOrders: Order[]
    makerTokenVolumes: Volume[]
    takerTokenVolumes: Volume[]

}

export interface Volume {
    id: string
    amount: number
    token: Token
}

export interface UserQueryData {
    user: UserType
}

export interface Prices {
    [address: string]: number
}