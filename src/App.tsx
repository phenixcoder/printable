import { Router, Route, Link, RootRoute, Outlet, RouterProvider } from '@tanstack/react-router';
import './App.css'
import { Home } from './components/Home';
import { Calendar } from './components/Calendar';

function Root() {
  return (
      <Outlet />
  )
}

const rootRoute = new RootRoute({
  component: Root,
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const CalendarRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/calendar',
  component: Calendar,
})

const routeTree = rootRoute.addChildren([indexRoute, CalendarRoute])

const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
