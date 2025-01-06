export type Book = {
    id: string,
    title: string,
    author: string,
    total_copies: number,
    available_copies: number,
    description: string,
    year: number
}

export type BookDto = Omit<Book, "id">