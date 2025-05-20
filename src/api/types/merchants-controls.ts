export type Account = {
  id: string
  name: string
}

export type UseAccount = {
  account: string
  setAccount: (value: string) => void
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
