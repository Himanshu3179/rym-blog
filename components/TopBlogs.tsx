import { getTopBlogs } from '@/app/actions'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const TopBlogs = async () => {
    const blogs = await getTopBlogs();

    if (!blogs || blogs.length === 0) return (
        <div className='flex flex-col gap-5 text-indigo-900 py-7 px-3 shadow-md rounded-lg bg-white '>
            <p className='text-2xl text-center font-bold '>Top Blogs</p>
            <div className='flex flex-col gap-2 font-bold'>
                <p>No blogs found</p>
            </div>
        </div>
    )

    return (
        <div className='flex flex-col gap-5 text-indigo-900 py-7 px-3 shadow-md rounded-lg bg-white '>
            <p className='text-2xl text-center font-bold '>Top Blogs</p>
            <div className='flex flex-col gap-2 font-bold'>
                {
                    blogs.map((blog, i) => (
                        <Link
                            href={`/blog/${blog.id}`}
                            key={i} className='flex gap-5
                        py-2 px-4 rounded-lg 
                        hover:bg-secondary 
                        transition-all
                        '>
                            <p className='text-3xl'>{i + 1}</p>
                            <div>
                                <p>{blog.title.substring(0, 50)}{'...'}</p>
                                <p className='text-sm text-muted-foreground font-semibold'>{blog.createdAt.toDateString()}</p>
                            </div>
                            <Image src={blog.imageUrl} alt={blog.title} width={100} height={50}
                                className='rounded-lg ml-auto h-[50px] object-cover'
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default TopBlogs