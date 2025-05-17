import { useQuery } from '@tanstack/react-query'
import { merchantsApiService } from 'api/services'
import type { UseMerchants } from 'api/types'
import { QUERY_KEY } from 'app/constants'
import { useMemo } from 'react'

export const useMerchants = (): UseMerchants => {
  const { data, isSuccess, isError } = useQuery({
    queryKey: [QUERY_KEY.merchants],
    queryFn: () => merchantsApiService.getMerchants(),
    select: (data) => data.data,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60 * 60,
  })

  return useMemo(() => {
    return {
      data: data ?? [],
      isSuccess,
      isError,
    }
  }, [data, isSuccess, isError])
}
