import { Grid } from '@mui/material'
import { HelperPanel, MerchantsContainer } from 'features'

export const HomePage = () => (
  <Grid container spacing={2}>
    <Grid size={3}>
      <HelperPanel />
    </Grid>
    <Grid size={9}>
      <MerchantsContainer />
    </Grid>
  </Grid>
)
