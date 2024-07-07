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
            
        '>
            <div className='relative rounded-3xl overflow-hidden'>
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
            <div className='mt-5' />
            <div className='flex justify-between items-center'>
                <Badge className='bg-indigo-900'>
                    {blog.category.name}
                </Badge>
                <p className=' text-sm font-semibold text-muted-foreground'>
                    {blog.createdAt.toDateString()}
                </p>
            </div>
            <p className='text-xl font-bold 
                    hover:text-indigo-900
                    line-clamp-2
                '>{blog.title}{' ...'}</p>


            {/* dangerouslyhtml */}
            <div
                className='text-sm text-muted-foreground
                line-clamp-2
                '
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />

        </Link>
    )
}

export default BlogCard