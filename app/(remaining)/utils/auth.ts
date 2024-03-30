import { User } from "../interfaces/interfaces"

export const setUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = () : User | null => {
    const user = localStorage.getItem('user')
    if (user != null) {
        return JSON.parse(user)
    }
    return user
}

export const removeUser = () => {
    localStorage.removeItem('user')
}