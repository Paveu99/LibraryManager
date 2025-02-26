import { createFileRoute } from '@tanstack/react-router'
import { BooksList } from '../../components/books'

export const Route = createFileRoute('/books/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <BooksList />
}
