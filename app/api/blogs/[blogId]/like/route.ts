import { getUserId } from "@/app/actions";
import db from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request, context: any) {
  const userId = await getUserId();
  if (!userId) {
    console.log("You need to login first");
    return NextResponse.json(
      { message: "You need to login first" },
      { status: 401 }
    );
  }

  const { blogId } = context.params;

  try {
    const blog = await db.blog.findUnique({
      where: { id: blogId },
      select: {
        id: true,
        likes: {
          select: {
            id: true,
            userId: true,
          },
        },
      },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const like = blog.likes.find((like) => like.userId === userId);

    if (like) {
      await db.like.delete({
        where: { id: like.id },
      });
    } else {
      await db.like.create({
        data: {
          blog: {
            connect: {
              id: blogId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
