import {
  FormControl,
  FormControlLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
  Stack,
  Typography,
} from '@mui/material'
import type { Option } from './select'

type Props = {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  options: Array<Option>
  label?: string
}

export const RadioGroup = ({ value, onChange, options, label }: Props) => (
  <FormControl sx={{ ml: 2 }}>
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      {label && <Typography>{label}</Typography>}
      <MuiRadioGroup value={value} onChange={onChange}>
        <Stack direction="row">
          {options.map(({ id, name }) => (
            <FormControlLabel
              key={id}
              value={id}
              control={<Radio />}
              label={name}
            />
          ))}
        </Stack>
      </MuiRadioGroup>
    </Stack>
  </FormControl>
)
