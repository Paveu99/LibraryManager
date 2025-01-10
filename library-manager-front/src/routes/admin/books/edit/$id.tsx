import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/books/edit/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/books/edit/$id"!</div>
}
