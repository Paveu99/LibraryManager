import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/logs-history/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/logs/"!</div>
}
