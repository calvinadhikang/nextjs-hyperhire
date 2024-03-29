import Link from "next/link";

export default function Page(){
    return (
        <div className="w-full">
            <h1 className="font-bold text-2xl text-center">Sign up a new account</h1>
            <div className="space-y-6 mt-10">
                <div>
                    <label>Name</label>
                    <div className="mt-2">
                        <input type="text" className="input input-primary w-full" />
                    </div>
                </div>

                <div>
                    <label>Username</label>
                    <div className="mt-2">
                        <input type="text" className="input input-primary w-full" />
                    </div>
                </div>
  
                <div>
                    <label>Password</label>
                    <div className="mt-2">
                        <input type="text" className="input input-primary w-full" />
                    </div>
                </div>
    
                <button className="btn btn-primary btn-block">Sign Up</button>
            </div>

            <p className="mt-10 text-center text-gray-500">
                <span>Already a member?</span>{' '}
                <Link href={'login'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign In Now</Link>
            </p>
        </div>
    )
}