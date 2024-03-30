import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import API_URLS from "../apiConfig";

export async function POST(
    req: NextRequest,
    res: NextResponse
) {
    const { username, password } = await req.json()
    const response = await axios.post(API_URLS + "auth/login", {
        username: username,
        password: password
    })
    const result = response.data

    return NextResponse.json(result)
}