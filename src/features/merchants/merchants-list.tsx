import { Typography } from '@mui/material'
import { useMerchants } from 'api/hooks'

export const MerchantsList = () => {
  const { data } = useMerchants()
  return (
    <div>
      {data.map(({ id, name }) => (
        <Typography key={id}>{`${id}: ${name}`}</Typography>
      ))}
    </div>
  )
}
