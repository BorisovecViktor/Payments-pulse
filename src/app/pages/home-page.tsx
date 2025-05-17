import { Grid, Typography } from '@mui/material'
import { MerchantsList } from 'features'

export const HomePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid size={2}>
        <MerchantsList />
      </Grid>
      <Grid size={10}>
        <Typography>size=10</Typography>
      </Grid>
      <Grid size={12}>
        <Typography>size=12</Typography>
      </Grid>
    </Grid>
  )
}
