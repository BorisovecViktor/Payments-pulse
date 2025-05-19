import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { UseTransactionsFilter } from 'api/types'
import { QUERY_KEY } from 'app/constants'
import { useLocalStorage } from 'lib'
import { transactionFilters } from 'mocks'
import { useCallback, useEffect, useMemo } from 'react'

export const useTransactionsFilter = (): UseTransactionsFilter => {
  const queryClient = useQueryClient()
  const defaultTransactionFilters = transactionFilters[0].id
  const [transactionsFilterLocalStorage, setTransactionsFilterLocalStorage] =
    useLocalStorage('transactionsFilter', defaultTransactionFilters)

  const { data: transactionsFilter, isError } = useQuery({
    queryKey: [QUERY_KEY.transactionsFilter],
    queryFn: () => {},
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: transactionsFilterLocalStorage,
  })

  useEffect(() => {
    if (!transactionsFilter || isError)
      setTransactionsFilterLocalStorage(defaultTransactionFilters)
    else setTransactionsFilterLocalStorage(transactionsFilter)
  }, [
    isError,
    transactionsFilter,
    setTransactionsFilterLocalStorage,
    defaultTransactionFilters,
  ])

  const setTransactionsFilter = useCallback(
    (value: string) => {
      return queryClient.setQueryData([QUERY_KEY.transactionsFilter], value)
    },
    [queryClient],
  )

  return useMemo(() => {
    return {
      transactionsFilter,
      setTransactionsFilter,
      isError,
    }
  }, [isError, setTransactionsFilter, transactionsFilter])
}
