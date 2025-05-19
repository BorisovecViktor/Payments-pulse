import { useMemo, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef, Row, SortingState } from '@tanstack/react-table'
import type { MerchantStatistic } from 'api/types'
import { useMerchantStatistic } from 'api/hooks'
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { TableHeadCell } from 'components'
import { MerchantStatisticTableItem } from './merchant-statistic-table-item'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'

type Props = {
  merchantId: string
  refreshInterval: string
}

export const MerchantStatisticTable = ({
  merchantId,
  refreshInterval,
}: Props) => {
  const { data, isFetching } = useMerchantStatistic({
    merchantId,
    refreshInterval,
  })
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'fail',
      desc: true,
    },
  ])

  const columns = useMemo<Array<ColumnDef<MerchantStatistic>>>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'transactions',
        header: 'Live Tx/min',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'fail',
        header: 'Fail %',
        cell: (info) => {
          const value = String(info.getValue())

          return (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Typography>{value}</Typography>
              {Number(value) >= 90 ? (
                <Tooltip
                  title={`This merchant’s fail spike is ${value}% likely 3-D Secure misconfig - suggest fallback`}
                  placement="right"
                >
                  <ErrorOutlineOutlinedIcon fontSize="small" color="error" />
                </Tooltip>
              ) : null}
            </Stack>
          )
        },
      },
      {
        accessorKey: 'score',
        header: 'Score',
        cell: (info) => info.getValue(),
      },
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const { rows } = table.getRowModel()

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 34,
    overscan: 5,
  })

  return (
    <TableContainer
      component={Paper}
      ref={tableContainerRef}
      sx={{ height: '544px' }}
    >
      <Table size="small" aria-label="statistic table">
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
            height: `${virtualizer.getTotalSize()}px`,
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index] as Row<MerchantStatistic>

            return (
              <MerchantStatisticTableItem
                key={row.id}
                row={row}
                virtualRow={virtualRow}
                rowVirtualizer={virtualizer}
                isFetching={isFetching}
              />
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
