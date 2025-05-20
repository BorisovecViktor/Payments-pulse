export type Merchant = {
  id: string
  name: string
  transactions: number
  fail: number
  score: number
}

export type UseMerchants = {
  data: Array<Merchant>
  isFetching: boolean
  isLoading: boolean
  error: Error | null
}

export type UseMerchant = {
  merchant: string | null
  setMerchant: (value: string | null) => void
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
  isLoading: boolean
  error: Error | null
}
