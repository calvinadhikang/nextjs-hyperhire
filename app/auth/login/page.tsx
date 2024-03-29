'use client'

import API_URLS from "@/app/api/apiConfig";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Page(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const handleSignIn = async () => {
        if (username == '' || password == '') {
            setError(true)
            return
        }

        try {
            const response = await axios.post(API_URLS + "auth/login", {
                username: username,
                password: password
            })

            if (response.status == 201) {
                alert("Login Succesfull")
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="w-full">
            <h1 className="font-bold text-2xl text-center">Sign in to your account</h1>
            <div className="space-y-6 mt-10">
                <div>
                    <label>Username</label>
                    <div className="mt-2">
                        <input type="text" className="input input-primary w-full" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                </div>
  
                <div>
                    <label>Password</label>
                    <div className="mt-2">
                        <input type="text" className="input input-primary w-full" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
    
                <div className="space-y-2">
                    {error && <p className="text-error">All inputs must be filled !</p>}
                    <button className="btn btn-primary btn-block" onClick={() => handleSignIn()}>Sign In</button>
                </div>
            </div>

            <p className="mt-10 text-center text-gray-500">
                <span>Not a member?</span>{' '}
                <Link href={'register'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register Now</Link>
            </p>
        </div>
    )
}