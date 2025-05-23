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

export const useTransactions = ({
  merchantId,
  transactionsFilter,
}: Props): UseMerchantTransactions => {
  const { data, isLoading, error } = useQuery({
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
      isLoading,
      error,
    }
  }, [transactionsFilter, data, isLoading, error])
}
