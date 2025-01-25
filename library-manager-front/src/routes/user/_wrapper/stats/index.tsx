import { createFileRoute } from '@tanstack/react-router'
import { Statistics } from '../../../../components/userPanel/statistics/Statistics'

export const Route = createFileRoute('/user/_wrapper/stats/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Statistics />
}
