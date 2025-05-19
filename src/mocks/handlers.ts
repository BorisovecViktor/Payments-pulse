import { http, HttpResponse } from 'msw'
import { merchants, merchantStatistic, merchantTransactions } from './data'
export const API_URL = import.meta.env.VITE_API_URL

export const handlers = [
  http.get(`${API_URL}/merchants`, () => {
    return HttpResponse.json(merchants)
  }),

  http.get(`${API_URL}/stats/:merchantId`, () => {
    return HttpResponse.json(merchantStatistic)
  }),

  http.get(`${API_URL}/transactions/:merchantId`, () => {
    return HttpResponse.json(merchantTransactions)
  }),
]
