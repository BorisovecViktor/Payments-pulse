import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { AppLayout } from 'layout'
import { pageConfig } from 'app/page-config'
import { HomePage } from 'app/pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={pageConfig.home} element={<AppLayout />}>
      <Route
        index
        element={<HomePage />}

        // TODO: If more than 1 page, you can add lazy loading for pages
        // lazy={async () => {
        //   const { HomePage } = await import('app/pages')
        //   return { Component: HomePage }
        // }}
      />
    </Route>,
  ),
)

export const App = () => {
  return <RouterProvider router={router} />
}
