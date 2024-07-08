import { getUserId } from "@/app/actions";
import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request, context: any) {
  const { comment } = await req.json();
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ message: "You must be logged in to comment" }, { status: 401 });
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
