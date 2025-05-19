import { useQuery } from '@tanstack/react-query'
import { merchantsApiService } from 'api/services'
import {
  MerchantTransactionStatus,
  type UseMerchantTransactions,
} from 'api/types'
import { QUERY_KEY } from 'app/constants'
import { useMemo } from 'react'

type Props = {
  merchantId: string
  transactionsFilter: string
}

export const useMerchantTransactions = ({
  merchantId,
  transactionsFilter,
}: Props): UseMerchantTransactions => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: [QUERY_KEY.merchantTransactions, { merchantId }],
    queryFn: () => merchantsApiService.getMerchantTransactions(merchantId),
    select: (data) => data.data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  return useMemo(() => {
    return {
      data:
        transactionsFilter === MerchantTransactionStatus.FAILED
          ? data?.filter(
              (item) => item.status === MerchantTransactionStatus.FAILED,
            ) ?? []
          : data ?? [],
      isSuccess,
      isError,
    }
  }, [transactionsFilter, data, isSuccess, isError])
}
