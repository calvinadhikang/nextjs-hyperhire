'use client'

import { useEffect, useState } from "react";
import { getUser, User } from "./utils/auth";
import NavBar from "./components/NavBar";

export default function Home() {
    return (
        <>
            <NavBar></NavBar>
            <div className="w-screen max-w-7xl m-auto">
                <div className="">
                    <h1>Welcome to Bookstore</h1>
                </div>
            </div>
        </>
    );
}
