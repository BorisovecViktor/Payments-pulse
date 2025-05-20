import { $api } from 'api/http'
import type { Account, Merchant, MerchantTransaction } from 'api/types'

class MerchantsApiService {
  getAccounts() {
    return $api.get<Array<Account>>('/accounts')
  }
  
  getMerchants(id: string) {
    return $api.get<Array<Merchant>>(`/stats/${id}`)
  }

  getMerchantTransactions(id: string) {
    return $api.get<Array<MerchantTransaction>>(`/transactions/${id}`)
  }
}

export const merchantsApiService = new MerchantsApiService()
