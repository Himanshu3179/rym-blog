import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Badge } from './ui/badge';
import { getBlogById } from '@/app/actions';
interface BlogProps {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    category: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
}


const BlogCard = (
    { blog, blogId }: { blog?: BlogProps, blogId?: string }
) => {

    // either blog or blogId is required

    // if blog is not provided, fetch blog by blogId

    if (!blog && !blogId) {
        return null;
    }



    if (!blog && blogId) {
        // fetch blog by blogId
        const blog = getBlogById(blogId);
    }

    if (!blog) {
        return null;
    }


    return (
        <Link
            href={`/blog/${blog.id}`}
            className='
            max-w-md w-full rounded-lg flex flex-col
            max-h-[500px] h-full
            mb-20            
        '>
            <div className='relative rounded-2xl overflow-hidden'>
                <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    width={400}
                    height={200}
                    className='rounded-2xl w-full object-cover h-[200px] z-20
                    transition-transform
                    transform
                    hover:scale-110
                    duration-200
                    group-hover:scale-105
                    '
                />
            </div>
            <div className='mt-5'>
                <Badge className='bg-indigo-900'>
                    {blog.category.name}
                </Badge>
                <p className='text-xl font-bold mb-2 
                    hover:text-indigo-900
                '>{blog.title.substring(0, 50)}{' ...'}</p>
            </div>
            <p className=' text-sm font-semibold text-muted-foreground'>
                {blog.createdAt.toDateString()}
            </p>
        </Link>
    )
}

export default BlogCard