import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_wrapper/rentals/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/rentals/$id"!</div>
}
