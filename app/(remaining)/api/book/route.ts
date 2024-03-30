import { NextRequest, NextResponse } from "next/server"
import API_URLS from "../apiConfig"
import axios from "axios"

export async function GET (req: NextRequest) {
    const search = req.nextUrl.searchParams.get('search') as string
    const page = req.nextUrl.searchParams.get('page') as string
    const limit = req.nextUrl.searchParams.get('limit') as string
    const queryTags = req.nextUrl.searchParams.getAll('tags') as string[]

    const queryParams = new URLSearchParams();
    queryParams.append('search', search ? search : '')
    queryParams.append('page', page ? page : '')
    queryParams.append('limit', limit ? limit : '')
    queryTags.forEach((tag) => {
        queryParams.append('tags', tag)
    })

    let url = `book?${queryParams}`
    const response = await axios.get(API_URLS + url)
    const result = response.data

    return NextResponse.json(result)
}