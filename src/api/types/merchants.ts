export type Merchant = {
  id: string
  name: string
}

export type UseMerchants = {
  data: Array<Merchant>
  isSuccess: boolean
  isError: boolean
}

export type MerchantStatistic = {
  id: string
  name: string
  transactions: number
  fail: number
  score: number
}

export type UseMerchantStatistic = {
  data: Array<MerchantStatistic>
  isSuccess: boolean
  isFetching: boolean
  isError: boolean
}

export enum MerchantTransactionStatus {
  SUCCESS = 'success',
  FAILED = 'failed',
}

export type MerchantTransaction = {
  id: string
  amount: string
  status: MerchantTransactionStatus
  time: string
  provider: string
}

export type UseMerchantTransactions = {
  data: Array<MerchantTransaction>
  isSuccess: boolean
  isError: boolean
}
