'use client'

import React, { useEffect, useState } from "react"
import { Book, Tag } from "../interfaces/interfaces"
import BookItem from "./BookItem"
import axios from "axios"
import API_URLS from "../api/apiConfig"
import { useRouter } from "next/navigation"
import { Router } from "next/router"

export default function BookPage () {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [books, setBooks] = useState<Book[]>([])
    const [tags, setTags] = useState<Tag[]>([])
    const [queryTags, setQueryTags] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true)

            const queryParams = new URLSearchParams();
            queryParams.append('search', search)
            queryTags.forEach((tag) => {
                queryParams.append('tags', tag)
            })

            let url = `book?${queryParams}`
            const response = await axios.get(API_URLS + url)
            
            setBooks(response.data)
            setLoading(false)
        }

        const fetchTags = async () => {
            const response = await axios.get(API_URLS + 'tag')
            setTags(response.data)
        }

        fetchBooks()
        fetchTags()
    }, [search, queryTags])

    
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxValue = event.target.value
        
        if (event.target.checked) {
            setQueryTags([...queryTags, checkboxValue])
        } else {
            setQueryTags(queryTags.filter(item => item !== checkboxValue))
        }
    }
    
    return(
        <div className="">
            <div className="flex">
                <div className="w-1/3 rounded-badge">
                    <div className="text-xl font-bold text-center mt-3">Filters</div>
                    <div className="collapse collapse-plus">
                        <input type="checkbox" />
                        <div className="collapse-title text-lg font-medium">
                            <p>Tags</p>
                        </div>
                        <div className="collapse-content"> 
                            <ul>
                                {tags.map((tag) => 
                                    <li key={tag.id} className="mb-2">
                                        <div className="flex items-center gap-x-2">
                                            <input type="checkbox" className="checkbox" value={tag.name} onChange={handleCheckboxChange} checked={queryTags.includes(tag.name)} />
                                            <span>{tag.name}</span>
                                        </div>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="w-2/3 px-5">
                    <div className="mb-3 flex">
                        <input type="text" placeholder="Search by title..."className="input input-primary flex-1" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 ">
                        {loading && <p>Loading...</p>}
                        {books && books.map((book) => <BookItem key={book.id} {...book}></BookItem>)}
                    </div>
                </div>
            </div>
        </div>
    )
}