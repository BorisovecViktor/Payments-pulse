import { Divider, Stack, Typography } from '@mui/material'
import { useMerchants } from 'api/hooks'

export const MerchantsList = () => {
  const { data } = useMerchants()

  return (
    <Stack>
      <Typography>Merchants:</Typography>
      <Divider />
      <Stack
        component="ul"
        sx={{
          pl: 2,
          maxHeight: 'calc(100vh - 119px)',
          overflow: 'hidden',
          overflowY: 'scroll',
        }}
      >
        {data.map(({ id, name }) => (
          <Typography key={id} component="li">
            {name}
          </Typography>
        ))}
      </Stack>
    </Stack>
  )
}
