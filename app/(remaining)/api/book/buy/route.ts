import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import API_URLS from "../../apiConfig";

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    const { user, book, quantity } = await req.json()
    try {
        const response = await axios.post(API_URLS + "book/buy", {
            user: user,
            book: book,
            quantity: quantity
        })
        const result = response.data
        return NextResponse.json(quantity)
    } catch (error) {
        return NextResponse.json(error)
    }
}