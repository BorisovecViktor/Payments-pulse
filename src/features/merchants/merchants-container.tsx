import { Stack, useMediaQuery, useTheme } from '@mui/material'
import { accounts, refreshIntervals, transactionFilters } from 'mocks/data'
import {
  useAccounts,
  useMerchant,
  useRefreshInterval,
  useTransactionsFilter,
} from 'api/hooks'
import { RadioGroup, Select } from 'components'
import { MerchantsTable } from './merchants-table'
import { MerchantTransactionsTable } from './merchant-transactions-table'

export const MerchantsContainer = () => {
  // these hooks allow store data in a local storage (saves after page reload) and use it in any component without drilling
  const { account, setAccount } = useAccounts()
  const { refreshInterval, setRefreshInterval } = useRefreshInterval()
  const { transactionsFilter, setTransactionsFilter } = useTransactionsFilter()
  const { merchant } = useMerchant()
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
          value={account}
          onChange={setAccount}
          options={accounts}
          label="Accounts"
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
      <MerchantsTable accountId={account} refreshInterval={refreshInterval} />
      {merchant && (
        <MerchantTransactionsTable
          merchantId={merchant}
          transactionsFilter={transactionsFilter}
        />
      )}
    </Stack>
  )
}
