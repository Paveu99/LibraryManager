import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/rentals/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/rentals/"!</div>
}
