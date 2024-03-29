export interface User {
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