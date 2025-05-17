import { $api } from 'api/http'
import type { Merchant } from 'api/types'

class MerchantsApiService {
  getMerchants() {
    return $api.get<Array<Merchant>>('/merchants')
  }
}

export const merchantsApiService = new MerchantsApiService()
