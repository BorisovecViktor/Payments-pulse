import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { UseRefreshInterval } from 'api/types'
import { QUERY_KEY } from 'app/constants'
import { useLocalStorage } from 'lib'
import { refreshIntervals } from 'mocks'
import { useCallback, useEffect, useMemo } from 'react'

export const useRefreshInterval = (): UseRefreshInterval => {
  const queryClient = useQueryClient()
  const defaultRefreshInterval = refreshIntervals[0].id
  const [refreshIntervalLocalStorage, setRefreshIntervalLocalStorage] =
    useLocalStorage('refreshInterval', defaultRefreshInterval)

  const { data: refreshInterval, isError } = useQuery({
    queryKey: [QUERY_KEY.refreshInterval],
    queryFn: () => {},
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: refreshIntervalLocalStorage,
  })

  useEffect(() => {
    if (!refreshInterval || isError)
      setRefreshIntervalLocalStorage(defaultRefreshInterval)
    else setRefreshIntervalLocalStorage(refreshInterval)
  }, [
    isError,
    refreshInterval,
    setRefreshIntervalLocalStorage,
    defaultRefreshInterval,
  ])

  const setRefreshInterval = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      return queryClient.setQueryData(
        [QUERY_KEY.refreshInterval],
        e.target.value,
      )
    },
    [queryClient],
  )

  return useMemo(() => {
    return {
      refreshInterval,
      setRefreshInterval,
      isError,
    }
  }, [isError, setRefreshInterval, refreshInterval])
}
