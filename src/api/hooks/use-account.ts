import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { UseAccount } from 'api/types'
import { QUERY_KEY } from 'app/constants'
import { useLocalStorage } from 'lib'
import { accounts } from 'mocks'
import { useCallback, useEffect, useMemo } from 'react'

export const useAccounts = (): UseAccount => {
  const queryClient = useQueryClient()
  const defaultAccount = accounts[0].id
  const [accountLocalStorage, setAccountLocalStorage] = useLocalStorage(
    'account',
    defaultAccount,
  )

  const { data: account, isError } = useQuery({
    queryKey: [QUERY_KEY.account],
    queryFn: () => {},
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: accountLocalStorage,
  })

  useEffect(() => {
    if (!account || isError) setAccountLocalStorage(defaultAccount)
    else setAccountLocalStorage(account)
  }, [isError, account, setAccountLocalStorage, defaultAccount])

  const setAccount = useCallback(
    (value: string) => {
      return queryClient.setQueryData([QUERY_KEY.account], value)
    },
    [queryClient],
  )

  return useMemo(() => {
    return {
      account,
      setAccount,
      isError,
    }
  }, [account, isError, setAccount])
}
