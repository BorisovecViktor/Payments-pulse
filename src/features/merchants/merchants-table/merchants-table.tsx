import { useMemo, useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef, Row, SortingState } from '@tanstack/react-table'
import type { Merchant } from 'api/types'
import { useMerchant, useMerchants } from 'api/hooks'
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
import { Skeleton, TableHeadCell, toastError } from 'components'
import { MerchantsTableItem } from './merchants-table-item'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import { MAX_FAILS, TABLE_ROW_HEIGHT } from 'app/constants'
import { getVisibleTableRows } from 'utils/merchant'

type Props = {
  accountId: string
  refreshInterval: string
}

export const MerchantsTable = ({ accountId, refreshInterval }: Props) => {
  const { data, isFetching, isLoading, error } = useMerchants({
    accountId,
    refreshInterval,
  })
  const { merchant } = useMerchant()
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const visibleTableRows = getVisibleTableRows(tableContainerRef)
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'fail',
      desc: true,
    },
  ])

  const columns = useMemo<Array<ColumnDef<Merchant>>>(
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
              <Typography sx={{ width: '35px' }}>{value}</Typography>
              {Number(value) >= MAX_FAILS ? (
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
        cell: (info) => (
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            {String(info.getValue())}
            {merchant === info.row.original.id && (
              <ExpandLessOutlinedIcon fontSize="small" />
            )}
          </Stack>
        ),
      },
    ],
    [merchant],
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
    estimateSize: () => TABLE_ROW_HEIGHT,
    overscan: 70,
  })

  if (error) {
    toastError(error.message)
  }
console.log(visibleTableRows);

  return (
    <TableContainer
      component={Paper}
      ref={tableContainerRef}
      sx={{ height: '543px' }}
    >
      {isLoading ? (
        <Skeleton rows={visibleTableRows} />
      ) : (
        <Table size="small" aria-label="merchants table">
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
              const row = rows[virtualRow.index] as Row<Merchant>

              return (
                <MerchantsTableItem
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
      )}
    </TableContainer>
  )
}
