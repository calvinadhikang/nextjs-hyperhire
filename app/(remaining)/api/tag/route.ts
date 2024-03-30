import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import API_URLS from "../apiConfig";

export async function GET () {
    const response = await axios.get(API_URLS + "tag")
    const result = response.data
    
    return NextResponse.json(result)
}