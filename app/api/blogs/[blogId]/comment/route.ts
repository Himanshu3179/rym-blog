import { getUserId } from "@/app/actions";
import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request, context: any) {
  const { comment } = await req.json();
  const userId = await getUserId();
  if (!userId) {
    return {
      status: 401,
      body: { message: "You need to login first" },
    };
  }

  const { blogId } = context.params;
  try {
    const newComment = await db.comment.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        blog: {
          connect: {
            id: blogId,
          },
        },
        content: comment,
      },
    });

    return NextResponse.json(newComment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
