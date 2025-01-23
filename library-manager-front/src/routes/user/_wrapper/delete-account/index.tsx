import { createFileRoute } from '@tanstack/react-router'
import { DeleteUser } from '../../../../components/userPanel'

export const Route = createFileRoute('/user/_wrapper/delete-account/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DeleteUser />
}
