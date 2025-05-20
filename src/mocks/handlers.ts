import { http, HttpResponse } from 'msw'
import { accounts, merchantTransactions } from './data'
import { generateMerchants } from 'utils/merchant'
export const API_URL = import.meta.env.VITE_API_URL

export const handlers = [
  http.get(`${API_URL}/accounts`, () => {
    return HttpResponse.json(accounts)
  }),

  http.get(`${API_URL}/stats/:accountId`, () => {
    return HttpResponse.json(generateMerchants(1000))
  }),

  http.get(`${API_URL}/transactions/:merchantId`, () => {
    return HttpResponse.json(merchantTransactions)
  }),
]
