import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { UseMerchant } from 'api/types'
import { QUERY_KEY } from 'app/constants'
import { useLocalStorage } from 'lib'
import { useCallback, useEffect, useMemo } from 'react'

export const useMerchant = (): UseMerchant => {
  const queryClient = useQueryClient()
  const [merchantLocalStorage, setMerchantLocalStorage] = useLocalStorage(
    'merchant',
    null,
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
    if (!merchant || isError) setMerchantLocalStorage(null)
    else setMerchantLocalStorage(merchant)
  }, [isError, merchant, setMerchantLocalStorage])

  const setMerchant = useCallback(
    (value: string | null) => {
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
  }, [merchant, isError, setMerchant])
}
