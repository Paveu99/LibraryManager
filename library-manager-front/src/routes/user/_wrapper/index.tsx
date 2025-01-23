import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/_wrapper/')({
    component: RouteComponent,
})

function RouteComponent() {
    return null
}
