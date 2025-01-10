export type User = {
    id?: string,
    first_name: string,
    last_name: string,
    email: string,
    role: "client" | "admin",
    library_card_code?: string,
    password: string
}

export type UserDto = Omit<User, "id" | "library_card_code">

export type UserDetials = Omit<User, "password" | "library_card_code">