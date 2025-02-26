import { createFileRoute } from '@tanstack/react-router'
import { RentalMangement } from '../../../../components/adminPanel'

export const Route = createFileRoute('/admin/_wrapper/rentals/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <RentalMangement />
}
