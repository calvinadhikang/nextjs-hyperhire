export interface User {
    id: number,
    name: string,
    username: string,
    password: string,
    point: number
}

export interface Book {
    id: number,
    title: string,
    writer: string,
    image: string,
    price: number
}

export interface Tag {
    id: number,
    name: string,
}

export interface Cart {
    id: number,
    quantity: number,
    subtotal: number,
    userId: number,
    book: Book
}