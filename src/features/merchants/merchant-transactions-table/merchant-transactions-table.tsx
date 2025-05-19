import { useMemo, useRef } from 'react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { TableHeadCell } from 'components'
import { MerchantTransactionsTableItem } from './merchant-transactions-table-item'
import { MerchantTransactionStatus, type MerchantTransaction } from 'api/types'
import { useMerchantTransactions } from 'api/hooks'
import { format } from 'date-fns'

type Props = {
  merchantId: string
  transactionsFilter: string
}

export const MerchantTransactionsTable = ({
  merchantId,
  transactionsFilter,
}: Props) => {
  const { data } = useMerchantTransactions({ merchantId, transactionsFilter })
  const tableContainerRef = useRef<HTMLDivElement>(null)

  const columns = useMemo<Array<ColumnDef<MerchantTransaction>>>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: (info) => <Typography>{`$${info.getValue()}`}</Typography>,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const value = String(info.getValue())

          return (
            <Typography
              color={
                value === MerchantTransactionStatus.FAILED ? 'error' : 'success'
              }
            >
              {value}
            </Typography>
          )
        },
      },
      {
        accessorKey: 'time',
        header: 'Time',
        cell: (info) => (
          <Typography>{`${format(
            String(info.getValue()),
            'hh:mm:ss',
          )}`}</Typography>
        ),
      },
      {
        accessorKey: 'provider',
        header: 'Provider',
        cell: (info) => info.getValue(),
      },
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  })

  const { rows } = table.getRowModel()

  return (
    <TableContainer
      component={Paper}
      ref={tableContainerRef}
      sx={{
        height: 'calc(100vh - 687px)',
        overflow: 'hidden',
        overflowY: 'scroll',
      }}
    >
      <Table size="small" aria-label="transactions table">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} sx={{ display: 'flex' }}>
              {headerGroup.headers.map((header) => (
                <TableHeadCell key={header.id} header={header} />
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody
          sx={{
            display: 'grid',
            position: 'relative',
          }}
        >
          {rows.map((row) => (
            <MerchantTransactionsTableItem key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
