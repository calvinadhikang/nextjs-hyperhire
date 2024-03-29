'use client'

import { useEffect, useState } from "react"
import { getUser } from "../utils/auth"
import axios from "axios"
import API_URLS from "../api/apiConfig"
import { Cart } from "../interfaces/interfaces"
import CartItem from "../components/CartItem"

export default function Page(){
    const [cart, setCart] = useState<Cart[]>([])
    const [toggle, setToggle] = useState(false)
    let total = 0

    useEffect(() => {
        const fetchCart = async () => {
            const user = getUser()
            if (user != null) {
                let url = `cart/${user.id}`
                const response = await axios.get(API_URLS + url)
                setCart(response.data)
            }
        }

        fetchCart()
    }, [toggle])

    cart.map((cart) => total += cart.subtotal)

    return(
        <div>
            <div className="w-screen max-w-7xl m-auto">
                <div className="mt-10">
                    <div className="flex w-full justify-between items-center">
                        <h1 className="text-3xl font-medium">Cart</h1>
                        <p className="text-xl">Grand Total : $ {total}</p>
                    </div>
                    <div className="flex flex-col flex-wrap gap-y-5 mt-5">
                    {cart.map((cart) => 
                        <CartItem key={cart.id} cart={cart} onAction={() => setToggle(!toggle)}></CartItem>
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}