export type Merchant = {
  id: string
  name: string
}

export type UseMerchants = {
  data: Array<Merchant>
  isSuccess: boolean
  isError: boolean
}
