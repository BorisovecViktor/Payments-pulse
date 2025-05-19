import { useQuery } from '@tanstack/react-query'
import { merchantsApiService } from 'api/services'
import type { UseMerchantStatistic } from 'api/types'
import { QUERY_KEY } from 'app/constants'
import { useMemo } from 'react'
import { getRefetchInterval } from 'utils/interval'

type Props = {
  merchantId: string
  refreshInterval: string
}

export const useMerchantStatistic = ({
  merchantId,
  refreshInterval,
}: Props): UseMerchantStatistic => {
  const { data, isSuccess, isFetching, isError } = useQuery({
    queryKey: [QUERY_KEY.merchantStatistic, { merchantId }],
    queryFn: () => merchantsApiService.getMerchantStatistic(merchantId),
    select: (data) => data.data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
    refetchInterval: getRefetchInterval(refreshInterval),
    // if it is necessary for the data to be updated in the background
    refetchIntervalInBackground: true,
  })

  return useMemo(() => {
    return {
      data: data ?? [],
      isSuccess,
      isFetching,
      isError,
    }
  }, [data, isSuccess, isFetching, isError])
}
