/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TopSalesQuery
// ====================================================

export interface TopSalesQuery_users_tokenBalancesOwned {
  __typename: 'TokenValuePair'
  value: any
}

export interface TopSalesQuery_users {
  __typename: 'User'
  id: string
  tokenBalancesOwned: TopSalesQuery_users_tokenBalancesOwned[] | null
}

export interface TopSalesQuery {
  users: TopSalesQuery_users[]
}
