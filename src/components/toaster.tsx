import toast from 'react-hot-toast'
import { green, red } from '@mui/material/colors'

export const toasterProps = {
  position: 'top-center',
  toastOptions: {
    success: {
      style: {
        background:
          'linear-gradient(0deg, rgba(74, 195, 152, 0.05), rgba(74, 195, 152, 0.05)), #FFFFFF',
        color: green[500],
        fontWeight: 700,
      },
    },
    error: {
      style: {
        background:
          'linear-gradient(0deg, rgba(252, 96, 91, 0.05), rgba(252, 96, 91, 0.05)), #FFFFFF',
        color: red[500],
        fontWeight: 700,
      },
    },
    style: {
      maxWidth: '400px',
      borderRadius: '6px',
      boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.3)',
    },
  },
} as const

export const toastError = toast.error
export const toastSuccess = toast.success
