import { createFileRoute } from '@tanstack/react-router'
import { UserHistory } from '../../../../components/userPanel'

export const Route = createFileRoute('/user/_wrapper/rentals/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <UserHistory />
}
