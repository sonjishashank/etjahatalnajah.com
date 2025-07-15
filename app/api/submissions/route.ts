import { NextResponse } from "next/server"
import { getAllSubmissions } from "@/lib/actions"

export async function GET() {
  try {
    const submissions = await getAllSubmissions()
    return NextResponse.json(submissions)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
