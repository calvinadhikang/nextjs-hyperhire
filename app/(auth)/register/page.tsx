'use client'
import API_URLS from "@/app/(remaining)/api/apiConfig";
import { showToast } from "@/app/(remaining)/components/Toast";
import { setUser } from "@/app/(remaining)/utils/auth";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Page(){
    const router = useRouter()
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleRegister = async () => {
        if (name == "" || username == "" || password == "") {
            setError('All inputs must be filled')
            return
        }

        try {
            const response = await axios.post("api/register", {
                name: name,
                username: username,
                password: password
            })
            const result = response.data

            if (result.error) {
                showToast(result.message, 'error')
                setError(result.message)
                return
            }else{
                showToast('Register successful !')
                setUser(result)
                router.push('/')
            }

        } catch (error) {

        }
    }

    return (
        <div className="w-full">
            <h1 className="font-bold text-2xl text-center">Sign up a new account</h1>
            <div className="space-y-6 mt-10">
                <div>
                    <label>Name</label>
                    <div className="mt-2">
                        <input type="text" className="input input-primary w-full" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>

                <div>
                    <label>Username</label>
                    <div className="mt-2">
                        <input type="text" className="input input-primary w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                </div>
  
                <div>
                    <label>Password</label>
                    <div className="mt-2">
                        <input type="text" className="input input-primary w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                
                <div className="space-y-2">
                    {error != '' && <p className="text-error">{error}</p>}
                    <button className="btn btn-primary btn-block" onClick={() => handleRegister()}>Sign Up</button>
                </div>
            </div>

            <p className="mt-10 text-center text-gray-500">
                <span>Already a member?</span>{' '}
                <Link href={'login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In</Link>
            </p>
        </div>
    )
}