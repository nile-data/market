/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TokenPriceQuery
// ====================================================

export interface TokenPriceQuery_token_orders {
  __typename: 'Order'
  tx: string
  serviceIndex: number
  createdTimestamp: number
}

export interface TokenPriceQuery_token_dispensers_token {
  __typename: 'Token'
  id: string
  name: string | null
  symbol: string | null
}

export interface TokenPriceQuery_token_dispensers {
  __typename: 'Dispenser'
  /**
   * token address
   */
  id: string
  active: boolean
  isMinter: boolean | null
  /**
   * max balance of requester. If the balance is higher, the dispense is rejected
   */
  maxBalance: any
  token: TokenPriceQuery_token_dispensers_token
}

export interface TokenPriceQuery_token_fixedRateExchanges_baseToken {
  __typename: 'Token'
  symbol: string | null
  name: string | null
  address: string
}

export interface TokenPriceQuery_token_fixedRateExchanges_datatoken {
  __typename: 'Token'
  symbol: string | null
  name: string | null
  address: string
}

export interface TokenPriceQuery_token_fixedRateExchanges {
  __typename: 'FixedRateExchange'
  /**
   * fixed rate exchange id
   */
  id: string
  exchangeId: string
  price: any
  baseToken: TokenPriceQuery_token_fixedRateExchanges_baseToken
  datatoken: TokenPriceQuery_token_fixedRateExchanges_datatoken
  active: boolean
}

export interface TokenPriceQuery_token_pools_baseToken {
  __typename: 'Token'
  symbol: string | null
  name: string | null
  address: string
}

export interface TokenPriceQuery_token_pools_datatoken {
  __typename: 'Token'
  symbol: string | null
  name: string | null
  address: string
}

export interface TokenPriceQuery_token_pools {
  __typename: 'Pool'
  /**
   * pool address
   */
  id: string
  spotPrice: any
  /**
   * only finalized pools are relevant to us
   */
  isFinalized: boolean
  datatokenLiquidity: any
  baseToken: TokenPriceQuery_token_pools_baseToken
  datatoken: TokenPriceQuery_token_pools_datatoken
}

export interface TokenPriceQuery_token {
  __typename: 'Token'
  id: string
  symbol: string | null
  name: string | null
  /**
   * orders created with the datatoken, only available for datatokens
   */
  orders: TokenPriceQuery_token_orders[] | null
  /**
   * dispensers using this token
   */
  dispensers: TokenPriceQuery_token_dispensers[] | null
  /**
   * fixed rate exchanges, only available for datatokens
   */
  fixedRateExchanges: TokenPriceQuery_token_fixedRateExchanges[] | null
  /**
   * pools, only available for datatokens
   */
  pools: TokenPriceQuery_token_pools[] | null
}

export interface TokenPriceQuery {
  token: TokenPriceQuery_token | null
}

export interface TokenPriceQueryVariables {
  datatokenId: string
  account?: string | null
}
