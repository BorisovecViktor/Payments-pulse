import { TableCell, TableRow } from '@mui/material'
import { blue, green, grey } from '@mui/material/colors'
import { flexRender, type Row } from '@tanstack/react-table'
import { Virtualizer, type VirtualItem } from '@tanstack/react-virtual'
import { useMerchant } from 'api/hooks'
import type { Merchant } from 'api/types'
import { memo } from 'react'

type Props = {
  row: Row<Merchant>
  virtualRow: VirtualItem
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>
  isFetching: boolean
}

export const MerchantsTableItem = memo(
  ({ row, virtualRow, rowVirtualizer, isFetching }: Props) => {
    const { merchant, setMerchant } = useMerchant()
    const isMatch = merchant === row.original.id

    return (
      <TableRow
        data-index={virtualRow.index}
        ref={(node) => rowVirtualizer.measureElement(node)}
        onClick={() => {
          if (merchant === row.original.id) {
            setMerchant(null)
          } else {
            setMerchant(row.original.id)
          }
        }}
        sx={{
          display: 'flex',
          position: 'absolute',
          transform: `translateY(${virtualRow.start}px)`,
          width: '100%',
          backgroundColor: isFetching
            ? green[100]
            : isMatch
            ? blue[50]
            : 'transparent',
          transition: !isFetching ? 'background-color 0.3s ease' : 'none',
          cursor: 'pointer',
          '&:hover': { backgroundColor: isMatch ? blue[50] : grey[200] },
        }}
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell
            key={cell.id}
            component="th"
            scope="row"
            sx={{
              minWidth: '1px',
              width: `${cell.column.getSize()}%`,
              ...cell.column.columnDef.meta,
            }}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    )
  },
)
