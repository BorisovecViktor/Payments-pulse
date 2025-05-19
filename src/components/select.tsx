import { useId } from 'react'
import { MenuItem, TextField as MuiTextField, Typography } from '@mui/material'

export type Option = {
  id: string
  name: string
}

type Props = {
  value: string
  onChange: (value: string) => void
  options: Array<Option>
  label: string
}

export const Select = ({ value, onChange, options, label }: Props) => {
  const uniqueId = useId()

  return (
    <MuiTextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      select
      label={label}
      slotProps={{
        inputLabel: {
          htmlFor: uniqueId,
        },
        input: {
          id: uniqueId,
        },
        select: {
          MenuProps: {
            sx: { maxHeight: 600 },
          },
        },
      }}
      size="small"
      sx={{ width: '150px' }}
    >
      {options.map(({ id, name }) => (
        <MenuItem key={id} value={id}>
          <Typography>{name}</Typography>
        </MenuItem>
      ))}
    </MuiTextField>
  )
}
