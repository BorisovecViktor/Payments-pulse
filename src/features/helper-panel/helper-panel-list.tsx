import { Divider, Paper, Typography } from '@mui/material'
import { HelperPanelItem } from './helper-panel-item'

// TODO: implement dynamic functionality
export const HelperPanel = () => (
  <Paper sx={{ height: 'calc(100vh - 100px)', p: 1 }}>
    <Typography variant="h2">Helper panel</Typography>
    <Divider sx={{ my: 1.5 }} />
    <HelperPanelItem
      header="Status summary"
      items={[
        { id: '1', primary: 'Total merchants', secondary: '100' },
        { id: '2', primary: 'Critical failures ( > 98% )', secondary: '14' },
        { id: '3', primary: 'Healthy merchants', secondary: '86' },
        { id: '4', primary: 'Average fail', secondary: '38%' },
      ]}
    />
    <HelperPanelItem
      header="Alerts"
      items={[
        {
          id: '1',
          primary: 'Attention',
          secondary: '6 merchants with fail over 90%',
        },
        {
          id: '2',
          primary: 'WebMoney_55',
          secondary: 'Has nearly 100% failures',
        },
      ]}
    />
    <HelperPanelItem
      header="Metrics Legend"
      items={[
        {
          id: '1',
          primary: 'Live Tx/min',
          secondary: 'Live transactions per minute',
        },
        {
          id: '2',
          primary: 'Fail %',
          secondary: 'Percentage of failed transaction',
        },
        { id: '3', primary: 'Score', secondary: "Merchant's rate" },
      ]}
    />
  </Paper>
)
