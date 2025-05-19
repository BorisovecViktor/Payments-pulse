export type UseMerchant = {
  merchant: string
  setMerchant: (value: string) => void
  isError: boolean
}

export type UseRefreshInterval = {
  refreshInterval: string
  setRefreshInterval: (e: React.ChangeEvent<HTMLInputElement>) => void
  isError: boolean
}

export type UseTransactionsFilter = {
  transactionsFilter: string
  setTransactionsFilter: (value: string) => void
  isError: boolean
}
