import { TableCell, TableRow } from '@mui/material'
import { flexRender, type Row } from '@tanstack/react-table'
import type { MerchantTransaction } from 'api/types'

type Props = {
  row: Row<MerchantTransaction>
}

export const MerchantTransactionsTableItem = ({ row }: Props) => (
  <TableRow sx={{ display: 'flex' }}>
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
