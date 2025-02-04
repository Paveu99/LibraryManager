import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/_wrapper/')({
  component: RouteComponent,
})

function RouteComponent() {
  return null
}
