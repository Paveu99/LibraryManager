export type Rental = {
    id?: number,
    user_id: string,
    book_id: string,
    rental_date: string,
    return_date: string,
    status: "rented" | "returned" | "overdue"
}

export type RentalDto = Omit<Rental, "id">