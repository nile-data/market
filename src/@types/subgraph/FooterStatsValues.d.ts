/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FooterStatsValues
// ====================================================

export interface FooterStatsValues_globalStatistics_totalLiquidity_token {
  __typename: 'Token'
  address: string
  name: string | null
  symbol: string | null
}

export interface FooterStatsValues_globalStatistics_totalLiquidity {
  __typename: 'GlobalTotalLiquidityPair'
  value: any
  token: FooterStatsValues_globalStatistics_totalLiquidity_token
}

export interface FooterStatsValues_globalStatistics {
  __typename: 'GlobalStatistic'
  /**
   * number of pools
   */
  poolCount: number
  /**
   * total nfts(erc721) created
   */
  nftCount: number
  /**
   * total datatokens (tokens with isDatatoken = true) created
   */
  datatokenCount: number
  /**
   * number of total orders. pool orders + fixed rate exchange orders + dispenser orders
   */
  orderCount: number
  /**
   * total liquidity for each base token in pools
   */
  totalLiquidity: FooterStatsValues_globalStatistics_totalLiquidity[]
}

export interface FooterStatsValues {
  globalStatistics: FooterStatsValues_globalStatistics[]
}
