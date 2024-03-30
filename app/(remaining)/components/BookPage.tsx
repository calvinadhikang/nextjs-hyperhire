'use client'

import React, { useEffect, useRef, useState } from "react"
import { Book, Tag } from "../interfaces/interfaces"
import BookItem from "./BookItem"
import axios from "axios"
import API_URLS from "../api/apiConfig"
import { useRouter } from "next/navigation"
import InfiniteScroll from "react-infinite-scroll-component"

export default function BookPage () {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [books, setBooks] = useState<Book[]>([])
    const [tags, setTags] = useState<Tag[]>([])
    const [queryTags, setQueryTags] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const limit = 8
    const prevSearch = useRef('')

    const fetchBooks = async () => {
        if (loading) {
            return
        }
        setLoading(true)

        const queryParams = new URLSearchParams();
        queryParams.append('search', search)
        queryParams.append('page', page.toString())
        queryParams.append('limit', limit.toString())
        queryTags.forEach((tag) => {
            queryParams.append('tags', tag)
        })

        let url = `book?${queryParams}`
        console.log(url)
        try {
            const response = await axios.get('/api/book?' + queryParams)
            console.log(response)
            const newData = response.data
            
            if (newData.length === 0) {
                setHasMore(false)
            } else {
                const filteredNewData = newData.filter((item: Book) => !books.find(book => book.id === item.id));
                setBooks((prevData) => [...prevData, ...filteredNewData])
                setPage((prevPage) => prevPage + 1)
            }
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTags()
        fetchBooks()
    }, [])

    const fetchTags = async () => {
        const response = await axios.get('/api/tag')
        console.log(response)
        setTags(response.data)
    }
    
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
                                    <li key={`tag-${tag.id}`} className="mb-2">
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
                    
                    {/* <p>{books.length}</p>
                    <p>{page}</p>
                    <p>{limit}</p> */}
                        
                    <InfiniteScroll
                        dataLength={books.length}
                        next={fetchBooks}
                        hasMore={hasMore}
                        loader={loading && <div className="text-center"><span className="loading loading-dots loading-lg"></span></div>}
                        endMessage={<div className="text-center mt-10">No More Data</div>}
                        scrollThreshold={0.8}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 ">
                            {books && books.map((book) => <BookItem key={book.id} {...book}></BookItem>)}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    )
}