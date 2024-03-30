'use client'

import { useEffect, useState } from "react"
import { getUser } from "../utils/auth"
import axios from "axios"
import API_URLS from "../api/apiConfig"
import { Cart, User } from "../interfaces/interfaces"
import CartItem from "../components/CartItem"
import { useRouter } from "next/navigation"
import { setuid } from "process"

export default function Page(){
    const router = useRouter()
    const [cart, setCart] = useState<Cart[]>([])
    const [toggle, setToggle] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    
    let total = 0

    useEffect(() => {
        const fetchCart = async () => {
            const user = getUser()
            if (user != null) {
                setUser(user)
                let url = `cart/${user.id}`
                const response = await axios.get(API_URLS + url)
                setCart(response.data)
            }else{
                router.push('/')
            }
        }

        fetchCart()
    }, [toggle])

    cart.map((cart) => total += cart.subtotal)

    return(
        <div>
            <div className="w-screen max-w-7xl m-auto">
                <div className="mt-10">
                    <h1 className="text-3xl font-medium">Cart</h1>
                    <div className="flex flex-col flex-wrap gap-y-5 mt-5">
                    {cart.map((cart) => 
                        <CartItem key={cart.id} cart={cart} onAction={() => setToggle(!toggle)}></CartItem>
                    )}
                    </div>
                    <div className="flex flex-col w-full justify-end items-end gap-2 my-5">
                        <p className="text-xl">Grand Total : $ {total}</p>
                        {user?.point < total && <p className="text-error">Insufficient Points !</p>}
                        <button className="btn btn-primary" disabled={user?.point < total}>Purchase</button>
                    </div>
                </div>
            </div>
        </div>
    )
}