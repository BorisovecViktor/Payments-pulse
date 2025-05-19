import { Box, TableCell, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { flexRender, type Header } from '@tanstack/react-table'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'

type Props = {
  // TODO: change any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  header: Header<any, unknown>
}

export const TableHeadCell = ({ header }: Props) => {
  const { getSize, column, getContext, colSpan } = header
  const isSortable = column.getCanSort()

  return (
    <TableCell
      colSpan={colSpan}
      sx={{
        width: `${getSize()}%`,
        cursor: isSortable ? 'pointer' : 'default',
        userSelect: 'none',
        transition: 'background-color 0.3s ease-in-out',
        backgroundColor: grey[50],
        '&:hover': {
          backgroundColor: isSortable ? grey[200] : grey[50],
        },
      }}
    >
      <Box onClick={column.getToggleSortingHandler()}>
        <Typography
          fontWeight={700}
          sx={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}
        >
          {flexRender(column.columnDef.header, getContext())}
          {{
            asc: <ExpandLessOutlinedIcon fontSize="small" />,
            desc: <ExpandMoreOutlinedIcon fontSize="small" />,
          }[column.getIsSorted() as string] ?? null}
        </Typography>
      </Box>
    </TableCell>
  )
}
