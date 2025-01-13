import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/rentals/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/history/"!</div>
}
