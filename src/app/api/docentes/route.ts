import { conn } from "@/libs/mysql/db";
import { NextResponse } from "next/server";


export async function GET() {
  return NextResponse.json('hello world');
}



export async function POST(req: Request) {
    
}