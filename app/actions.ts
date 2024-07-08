import { NextAuthOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import categories from "@/lib/data/categories";
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

export async function getAllUsers() {
  return db.user.findMany();
}

export async function getUserDetails() {
  try {
    const session = await getServerSession(NextAuthOptions);
    if (!session || !session.user) {
      return null;
    }
    const email = session.user.email;
    if (!email) {
      return null;
    }
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get name

export async function getName() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return null;
    }
    return user.name;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get userID

export async function getUserId() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return null;
    }
    return user.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function isAuthenticated() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// get email

export async function getEmail() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return null;
    }
    return user.email;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// show all blogs

export async function getAllBlogs() {
  try {
    const blogs = await db.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    });
    return blogs;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// get blog by id

export async function getBlogById(id: string) {
  try {
    const blog = await db.blog.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          select: {
            user: true,
          },
        },
        category: true,
        // count likes
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    return blog;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// recent blogs , pic only 5

export async function getRecentBlogs() {
  try {
    const blogs = await db.blog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    return blogs;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// get top blogs

export async function getTopBlogs() {
  try {
    const blogs = await db.blog.findMany({
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
      take: 5,
    });
    return blogs;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// get blogs by category

export async function getBlogsByCategory(category: string) {
  try {
    let blogs;
    if (category === "other") {
      // Exclude blogs that belong to any category in the categories array
      blogs = await db.blog.findMany({
        where: {
          NOT: {
            category: {
              name: {
                in: categories, // Use the imported categories array
              },
            },
          },
        },
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      // Original logic to get blogs by a specific category
      blogs = await db.blog.findMany({
        where: {
          category: {
            name: category,
          },
        },
        include: {
          category: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }
    return blogs;
  } catch (error) {
    console.error(error);
    return [];
  }
}
// search blogs with query

export async function searchBlogs(query: string) {
  try {
    const queries = query.split(" ");
    const blogs = await db.blog.findMany({
      where: {
        OR: queries.map((query) => ({
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              content: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              author: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
            {
              category: {
                name: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
          ],
        })),
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return blogs;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// is author of blog

export async function isAuthorOfBlog(blogId: string) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return false;
    }
    const blog = await db.blog.findUnique({
      where: {
        id: blogId,
      },
      select: {
        authorId: true,
      },
    });
    if (!blog) {
      return false;
    }
    return blog.authorId === userId;
  } catch (error) {
    console.error(error);
    return false;
  }
}
