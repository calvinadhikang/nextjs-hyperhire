'use client'

import { useEffect, useState } from "react";
import { getUser, removeUser } from "../utils/auth";
import Link from "next/link";
import { User } from "../interfaces/interfaces";
import { useRouter } from "next/navigation";

export default function ProfileNav () {
    const router = useRouter()
    const [userData, setUserData] = useState<User | null>(null);
    const [isLogout, setIsLogout] = useState(false)

    useEffect(() => {
        setUserData(getUser())
    }, [isLogout])

    const handleLogout = () => {
        removeUser()
        setIsLogout(true)
        router.push('/')
    }
    
    return (
        <>
            {userData ? 
                <div className="flex gap-x-2">
                    <div className="dropdown dropdown-end">
                        <Link href={'/cart'}>
                            <div role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                            </div>
                        </Link>
                        {/* <div className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                            <span className="font-bold text-lg">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View cart</button>
                            </div>
                            </div>
                        </div> */}
                        </div>
                        <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
                :
                <Link href={'login'}>
                    {/* <button className="btn btn-sm">Login</button> */}
                    <button className="btn btn-sm">Login &#8594;</button>

                </Link>
            }
        </>
    )
}