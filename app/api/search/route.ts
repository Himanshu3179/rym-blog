import { getAllBlogs, searchBlogs } from "@/app/actions";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  if (!query) {
    const blogs = await getAllBlogs();
    return NextResponse.json(blogs);
  }
  const blogs = await searchBlogs(query);
  return NextResponse.json(blogs);
}
