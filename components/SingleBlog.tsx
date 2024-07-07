
import Image from 'next/image'
import React from 'react'
import BlogInteractionButtons from './BlogInteractionButtons';
import { getBlogById, getUserId } from '@/app/actions';
import Comments from './Comments';
import { Badge } from './ui/badge';
import Link from 'next/link';
import DeleteBlogButton from './DeleteBlogButton';
import parse from 'html-react-parser';


const SingleBlog = async (
    { blogId }: { blogId: string }
) => {
    const blog = await getBlogById(blogId)
    if (!blog) {

        return <div>Blog not found</div>
    }
    const userId = await getUserId()
    return (
        <div className='flex flex-col gap-5 justify-center '>
            <p className='text-4xl font-bold '>{blog.title}</p>
            <div className='flex gap-3 items-center'>
                <Link href={`/user/${blog.author.id}`}>
                    <p className='w-12 h-12 rounded-full bg-red-500 text-white font-bold flex items-center justify-center'>{blog.author.name.charAt(0).toUpperCase()}</p>
                </Link>
                <div>
                    <Link href={`/user/${blog.author.id}`}>
                        <p className='text-lg'>{blog.author.name}</p>
                    </Link>
                    <p className='text-muted-foreground '>Published on: {new Date(blog.createdAt).toDateString()}</p>
                </div>
                <div className='ml-auto'>
                    {/* edit and delete button if the user is the author of the blog */}
                    {
                        userId === blog.author.id && (
                            <div className='flex gap-2'>
                                <Link href={`/blog/edit/${blog.id}`}>
                                    <button className='bg-blue-600 text-white px-3 py-1 rounded-md'>Edit</button>
                                </Link>
                                <DeleteBlogButton
                                    blogId={blog.id}
                                />
                            </div>
                        )
                    }
                </div>
            </div>
            <Image src={blog.imageUrl} alt={blog.title} width={1000} height={400} className='rounded-lg' />
            <Badge className='bg-indigo-900 w-fit'>{blog.category.name}</Badge>
            <div className=''>{parse(blog.content)}</div>
            <BlogInteractionButtons
                blog={blog}
                userId={userId}
            />
            <Comments
                blog={blog}
                userId={userId}
            />
        </div>
    )
}

export default SingleBlog


