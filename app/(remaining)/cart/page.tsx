'use client'

import { useEffect, useState } from "react"
import { getUser } from "../utils/auth"
import axios from "axios"
import API_URLS from "../api/apiConfig"
import { Cart, User } from "../interfaces/interfaces"
import CartItem from "../components/CartItem"
import { useRouter } from "next/navigation"
import InfiniteScroll from "react-infinite-scroll-component"
import Link from "next/link"

export default function Page(){
    const router = useRouter()
    const [carts, setCarts] = useState<Cart[]>([])
    const [toggle, setToggle] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const [page, setPage] = useState(1)
    const limit = 4
    const [hasMore, setHasMore] = useState(true)
    
    let total = 0

    const fetchCarts = async () => {
        const user = getUser()
        if (user != null) {
            setUser(user)

            const queryParams = new URLSearchParams();
            queryParams.append('page', page.toString())
            queryParams.append('limit', limit.toString())

            let url = `cart/${user.id}?${queryParams}`
            const response = await axios.get(API_URLS + url)
            const newData = response.data
            console.log(url)
            console.log(newData)

            if (newData.length === 0) {
                setHasMore(false)
            } else {
                const filteredNewData = newData.filter((item: Cart) => !carts.find(cart => cart.id === item.id));
                setCarts((prevData) => [...prevData, ...filteredNewData])
                setPage((prevPage) => prevPage + 1)
            }
        }else{
            router.push('/')
        }
    }

    useEffect(() => {
        fetchCarts()
    }, [toggle])

    carts.map((cart) => total += cart.subtotal)

    const handleDelete = () => {
        router.push('/cart')
    }

        
    const handleCheckout = async () => {
        const user: User | null = getUser()
        if (user != null) {
            let url = `cart/checkout/${user.id}`
            const response = await axios.post(API_URLS + url)
            alert(response.data.message)
    
            if (!response.data.error) {
                router.push('/cart')
            }
        }
    }

    return(
        <div>
            <div className="w-screen max-w-7xl m-auto">
                <div className="mt-10">
                    <h1 className="text-3xl font-medium">Cart</h1>
                    { carts.length > 0 ? 
                    <div>
                        <InfiniteScroll
                            dataLength={carts.length}
                            next={fetchCarts}
                            hasMore={hasMore}
                            loader={<div className="text-center"><span className="loading loading-dots loading-lg"></span></div>}
                            endMessage={<div className="text-center mt-10">No More Data</div>}
                            scrollThreshold={0.8}
                        >
                        <div className="flex flex-col flex-wrap gap-y-5 mt-5">
                        {carts.map((cart) => 
                            <CartItem key={cart.id} cart={cart} onAction={() => handleDelete()}></CartItem>
                        )}
                        </div>
                        </InfiniteScroll>
                        <div className="flex flex-col w-full justify-end items-end gap-2 my-5">
                            <p className="text-xl">Grand Total : $ {total}</p>
                            <button className="btn btn-primary" onClick={handleCheckout}>Purchase</button>
                        </div>
                    </div>
                    :
                    <Link href={'/'}>
                        <div className="text-center p-2 hover:bg-slate-200 rounded hover:underline">Your cart is empty ! explore some books instead</div>
                    </Link>
                    }  
                </div>
            </div>
        </div>
    )
}