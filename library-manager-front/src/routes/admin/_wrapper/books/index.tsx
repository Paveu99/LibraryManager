import { createFileRoute } from '@tanstack/react-router'
import { BooksManagement } from '../../../../components/adminPanel'

export const Route = createFileRoute('/admin/_wrapper/books/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <BooksManagement />
}
