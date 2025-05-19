import { Stack, useMediaQuery, useTheme } from '@mui/material'
import { merchants, refreshIntervals, transactionFilters } from 'mocks/data'
import {
  useMerchant,
  useRefreshInterval,
  useTransactionsFilter,
} from 'api/hooks'
import { RadioGroup, Select } from 'components'
import { MerchantStatisticTable } from './merchant-statistic-table'
import { MerchantTransactionsTable } from './merchant-transactions-table'

export const MerchantsContainer = () => {
  // these hooks allow store data in a local storage (saves after page reload) and use it in any component without drilling
  const { merchant, setMerchant } = useMerchant()
  const { refreshInterval, setRefreshInterval } = useRefreshInterval()
  const { transactionsFilter, setTransactionsFilter } = useTransactionsFilter()
  const theme = useTheme()
  const mdUpMatch = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Stack spacing={2}>
      <Stack
        direction={mdUpMatch ? 'row' : 'column'}
        sx={{
          direction: 'row',
          alignItems: mdUpMatch ? 'center' : 'start',
          justifyContent: 'space-between',
        }}
      >
        <Select
          value={merchant}
          onChange={setMerchant}
          options={merchants}
          label="Merchants"
        />
        <RadioGroup
          value={refreshInterval}
          onChange={setRefreshInterval}
          options={refreshIntervals}
          label="Refresh:"
        />
        <Select
          value={transactionsFilter}
          onChange={setTransactionsFilter}
          options={transactionFilters}
          label="Transactions filters"
        />
      </Stack>
      <MerchantStatisticTable
        merchantId={merchant}
        refreshInterval={refreshInterval}
      />
      <MerchantTransactionsTable
        merchantId={merchant}
        transactionsFilter={transactionsFilter}
      />
    </Stack>
  )
}
