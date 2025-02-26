import { createFileRoute } from '@tanstack/react-router'
import { Logs } from '../../components/adminPanel'

export const Route = createFileRoute('/logs-history/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Logs />
}
