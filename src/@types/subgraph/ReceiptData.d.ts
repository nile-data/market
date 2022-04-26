/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NftUpdateType } from './globalTypes'

// ====================================================
// GraphQL query operation: ReceiptData
// ====================================================

export interface ReceiptData_nftUpdates_nft {
  __typename: 'Nft'
  /**
   * same as id, it's just for easy discoverability
   */
  address: string
}

export interface ReceiptData_nftUpdates {
  __typename: 'NftUpdate'
  id: string
  nft: ReceiptData_nftUpdates_nft
  tx: string
  timestamp: number
  /**
   * type of the update: metadata created, metadata update, state update, token uri update
   */
  type: NftUpdateType
}

export interface ReceiptData {
  nftUpdates: ReceiptData_nftUpdates[]
}

export interface ReceiptDataVariables {
  address: string
}
