import { $api } from 'api/http'
import type {
  Merchant,
  MerchantStatistic,
  MerchantTransaction,
} from 'api/types'

class MerchantsApiService {
  getMerchants() {
    return $api.get<Array<Merchant>>('/merchants')
  }
  getMerchantStatistic(id: string) {
    return $api.get<Array<MerchantStatistic>>(`/stats/${id}`)
  }

  getMerchantTransactions(id: string) {
    return $api.get<Array<MerchantTransaction>>(`/transactions/${id}`)
  }
}

export const merchantsApiService = new MerchantsApiService()
