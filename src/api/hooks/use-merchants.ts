import { useQuery } from '@tanstack/react-query'
import { merchantsApiService } from 'api/services'
import type { UseMerchants } from 'api/types'
import { QUERY_KEY } from 'app/constants'
import { useMemo } from 'react'
import { getRefetchInterval } from 'utils/merchant'

type Props = {
  accountId: string
  refreshInterval: string
}

export const useMerchants = ({
  accountId,
  refreshInterval,
}: Props): UseMerchants => {
  const { data, isFetching, isLoading, error } = useQuery({
    queryKey: [QUERY_KEY.merchants, { accountId }],
    queryFn: () => merchantsApiService.getMerchants(accountId),
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
      isFetching,
      isLoading,
      error,
    }
  }, [data, isFetching, isLoading, error])
}
