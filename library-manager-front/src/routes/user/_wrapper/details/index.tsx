import { createFileRoute } from '@tanstack/react-router'
import { UserDetails } from '../../../../components/userPanel'

export const Route = createFileRoute('/user/_wrapper/details/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserDetails />
}
