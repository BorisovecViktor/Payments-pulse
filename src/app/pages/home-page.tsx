import { Grid } from '@mui/material'
import { MerchantsList, MerchantsContainer } from 'features'

export const HomePage = () => (
  <Grid container rowSpacing={2} columnSpacing={5}>
    <Grid size={2}>
      <MerchantsList />
    </Grid>
    <Grid size={10}>
      <MerchantsContainer />
    </Grid>
  </Grid>
)
