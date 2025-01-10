import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/details/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/details/"!</div>
}
