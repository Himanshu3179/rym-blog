import { NextResponse } from "next/server";
import * as z from "zod";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getEmail, getUserDetails } from "@/app/actions";
import { DeleteObjectCommand } from "@aws-sdk/client-s3"; // Step 1: Import DeleteObjectCommand
import db from "@/lib/db";

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

async function uploadFileToS3(buffer: Buffer) {
  const newFileName = `rym-blog/${"blog"}-${Date.now()}`;
  const params = {
    Bucket: process.env.AWS_BUCKET as string,
    Key: newFileName,
    Body: buffer,
    ContentType: "image/jpg",
  };
  const command = new PutObjectCommand(params);
  const response = await s3Client.send(command);

  return newFileName;
}

const requestBodySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(300, "Title is too long, Only 300 characters allowed"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
});
export async function POST(req: Request) {
  
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      );
    }
    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files are accepted" },
        { status: 400 }
      );
    }

    const user = await getUserDetails();
    if (!user) {
      return NextResponse.json(
        { message: "You Need To Login First" },
        { status: 404 }
      );
    }

    const data = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
    };

    if (data.category === "") {
      return NextResponse.json(
        { message: "Category is required" },
        { status: 400 }
      );
    }

    const validatedData = requestBodySchema.safeParse(data);

    if (!validatedData.success) {
      console.log(validatedData.error.errors);
      return NextResponse.json(
        { message: "Invalid data", errors: validatedData.error.errors },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = await uploadFileToS3(buffer);
    const url = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${fileName}`;

    // get category id
    // find category by name if not found create one

    let category = await db.category.findFirst({
      where: {
        name: validatedData.data.category,
      },
    });

    if (!category) {
      // if category have spaces replace with hyphen and convert to lowercase
      const categoryName = validatedData.data.category
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      category = await db.category.create({
        data: {
          name: categoryName,
        },
      });
    }

    await db.blog.create({
      data: {
        title: validatedData.data.title,
        content: validatedData.data.content,
        categoryId: category.id,
        imageUrl: url,
        authorId: user.id,
      },
    });

    return NextResponse.json(
      { message: "Blog Created Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

// edit

const editRequestBodySchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(300, "Title is too long, Only 300 characters allowed"),
  content: z.string().min(1, "Content is required"),
  category: z.string().min(1, "Category is required"),
  id: z.string().min(1, "Id is required"),
});

export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const blogId = formData.get("id") as string;
    const user = await getUserDetails();
    if (!user) {
      return NextResponse.json(
        { message: "You Need To Login First" },
        { status: 404 }
      );
    }

    if (!blogId) {
      return NextResponse.json(
        { message: "No blog id provided" },
        { status: 400 }
      );
    }

    const blog = await db.blog.findUnique({
      where: {
        id: blogId,
        authorId: user.id,
      },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    let imageUrl = blog.imageUrl;

    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith("image/")) {
        return NextResponse.json(
          { message: "Only image files are accepted" },
          { status: 400 }
        );
      }

      // Delete existing image from S3 if it exists
      if (imageUrl) {
        const imageKey = imageUrl.split(`${process.env.AWS_BUCKET}.s3.amazonaws.com/`)[1];
        if (imageKey) {
          const deleteParams = {
            Bucket: process.env.AWS_BUCKET as string,
            Key: imageKey,
          };
          const deleteCommand = new DeleteObjectCommand(deleteParams);
          await s3Client.send(deleteCommand);
        }
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = await uploadFileToS3(buffer);
      imageUrl = `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/${fileName}`;
    }

    const data = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
    };

    if (data.category === "") {
      return NextResponse.json(
        { message: "Category is required" },
        { status: 400 }
      );
    }

    const validatedData = editRequestBodySchema.safeParse({
      ...data,
      id: blogId,
    });

    if (!validatedData.success) {
      console.log(validatedData.error.errors);
      return NextResponse.json(
        { message: "Invalid data", errors: validatedData.error.errors },
        { status: 400 }
      );
    }

    let category = await db.category.findFirst({
      where: {
        name: validatedData.data.category,
      },
    });

    if (!category) {
      const categoryName = validatedData.data.category
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

      category = await db.category.create({
        data: {
          name: categoryName,
        },
      });
    }

    await db.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title: validatedData.data.title,
        content: validatedData.data.content,
        categoryId: category.id,
        imageUrl,
      },
    });

    return NextResponse.json(
      { message: "Blog Updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

// delete

const deleteRequestBodySchema = z.object({
  id: z.string().min(1, "Id is required"),
});

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const user = await getUserDetails();
    if (!user) {
      return NextResponse.json(
        { message: "You Need To Login First" },
        { status: 404 }
      );
    }
    const validatedData = deleteRequestBodySchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: validatedData.error.errors },
        { status: 400 }
      );
    }

    const blog = await db.blog.findUnique({
      where: {
        id: validatedData.data.id,
        authorId: user.id,
      },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    const imageUrl = blog.imageUrl;
    const imageKey = imageUrl.split(
      `${process.env.AWS_BUCKET}.s3.amazonaws.com/`
    )[1];

    if (imageKey) {
      // Step 3: Create and Send DeleteObjectCommand
      const deleteParams = {
        Bucket: process.env.AWS_BUCKET as string,
        Key: imageKey,
      };
      const deleteCommand = new DeleteObjectCommand(deleteParams);
      await s3Client.send(deleteCommand);
    }

    await db.blog.delete({
      where: {
        id: validatedData.data.id,
      },
    });

    return NextResponse.json(
      { message: "Blog Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

// model User {
//   id        String    @id @default(uuid())
//   email     String    @unique
//   name      String
//   password  String
//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt
//   blogPosts Blog[]
//   likes     Like[]
//   comments  Comment[]
// }

// model Blog {
//   id         String    @id @default(uuid())
//   title      String
//   content    String
//   imageUrl   String
//   author     User      @relation(fields: [authorId], references: [id])
//   authorId   String
//   createdAt  DateTime  @default(now())
//   updatedAt  DateTime  @updatedAt
//   likes      Like[]
//   comments   Comment[]
//   category   Category  @relation(fields: [categoryId], references: [id])
//   categoryId String
// }

// model Like {
//   id        String   @id @default(uuid())
//   blog      Blog     @relation(fields: [blogId], references: [id])
//   blogId    String
//   user      User?    @relation(fields: [userId], references: [id])
//   userId    String?
//   createdAt DateTime @default(now())
// }

// model Comment {
//   id        String   @id @default(uuid())
//   blog      Blog     @relation(fields: [blogId], references: [id])
//   blogId    String
//   user      User?    @relation(fields: [userId], references: [id])
//   userId    String?
//   content   String
//   createdAt DateTime @default(now())
// }

// model Category {
//   id        String   @id @default(uuid())
//   name      String
//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
//   blogs     Blog[]
// }
