import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { UseMerchant } from 'api/types'
import { QUERY_KEY } from 'app/constants'
import { useLocalStorage } from 'lib'
import { merchants } from 'mocks'
import { useCallback, useEffect, useMemo } from 'react'

export const useMerchant = (): UseMerchant => {
  const queryClient = useQueryClient()
  const defaultMerchant = merchants[0].id
  const [merchantLocalStorage, setMerchantLocalStorage] = useLocalStorage(
    'merchant',
    defaultMerchant,
  )

  const { data: merchant, isError } = useQuery({
    queryKey: [QUERY_KEY.merchant],
    queryFn: () => {},
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: merchantLocalStorage,
  })

  useEffect(() => {
    if (!merchant || isError) setMerchantLocalStorage(defaultMerchant)
    else setMerchantLocalStorage(merchant)
  }, [isError, merchant, setMerchantLocalStorage, defaultMerchant])

  const setMerchant = useCallback(
    (value: string) => {
      return queryClient.setQueryData([QUERY_KEY.merchant], value)
    },
    [queryClient],
  )

  return useMemo(() => {
    return {
      merchant,
      setMerchant,
      isError,
    }
  }, [isError, merchant, setMerchant])
}
