import { createTheme } from '@mui/material/styles'
import { breakpointsTheme } from './breakpoints'
import { palette } from './palette'
import { typography } from './typography'

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: palette.backgroundColor,
    },
  },
  shape: {
    borderRadius: 6,
  },
  breakpoints: breakpointsTheme.breakpoints,
  typography,
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: {
          position: 'sticky',
          top: 0,
          zIndex: 1,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '6px 10px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0,
        },
        primary: {
          fontWeight: 'bold',
        },
      },
    },
  },
})

export { theme }
