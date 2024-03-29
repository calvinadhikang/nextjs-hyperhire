'use client'

import { useEffect, useState } from "react"
import { Book } from "../interfaces/interfaces"
import BookItem from "./BookItem"
import axios from "axios"
import API_URLS from "../api/apiConfig"

export default function BookPage () {
    const [search, setSearch] = useState('')
    const [books, setBooks] = useState<Book[]>([])

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get(API_URLS + "book");
            setBooks(response.data)
        }

        fetchBooks()
    }, [])
    
    return(
        <div className="">
            <div className="flex">
                <div className="w-1/3 rounded-badge">
                    <div className="text-xl font-bold text-center mt-3">Filters</div>
                    <div tabIndex={0} className="collapse collapse-plus">
                        <div className="collapse-title text-lg font-medium">
                            <p>Tags</p>
                        </div>
                        <div className="collapse-content"> 
                            <p>tabIndex={0} attribute is necessary to make the div focusable</p>
                        </div>
                    </div>
                </div>
                <div className="w-2/3 px-5">
                    <div className="mb-3 flex">
                        <input type="text" placeholder="Search by title..." className="input input-primary flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 ">
                        {books.length == 0 ? <p>Loading...</p> : books.map((book) => <BookItem key={book.id} {...book}></BookItem>)}
                    </div>
                </div>
            </div>
        </div>
    )
}