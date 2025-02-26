import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { useUserStore } from './store/useUserStore';
import { useShallow } from 'zustand/shallow';

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient: undefined!,
    role: undefined!,
    first_name: undefined!,
    last_name: undefined!,
    email: undefined!
  },
});


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}


export const App = () => {

  const { role, first_name, last_name, email } = useUserStore(useShallow(state => (
    {
      role: state.role,
      first_name: state.first_name,
      last_name: state.last_name,
      email: state.email
    })));

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ queryClient, role, first_name, last_name, email }} />
    </QueryClientProvider>
  )
}
