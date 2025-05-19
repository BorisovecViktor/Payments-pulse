import { Container, Stack, Typography } from '@mui/material'
import { RuntimeErrorDialog } from 'lib'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <Stack spacing={3}>
      <header>
        <Typography variant="h1" sx={{ textAlign: 'center' }}>
          Payments Pulse
        </Typography>
      </header>

      <Container component="main" maxWidth="xl">
        <ErrorBoundary FallbackComponent={RuntimeErrorDialog}>
          <Outlet />
        </ErrorBoundary>
      </Container>
    </Stack>
  )
}
