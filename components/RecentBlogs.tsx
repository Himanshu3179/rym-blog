import { getRecentBlogs } from '@/app/actions'
import Link from 'next/link'
import React from 'react'

const RecentBlogs = async () => {
    const blogs = await getRecentBlogs();
    return (
        <div className='flex flex-col gap-5 text-indigo-900 py-7 px-3 shadow-md rounded-lg bg-white '>
            <div className='flex flex-col gap-2 font-bold'>
                {
                    blogs.map((blog, i) => (
                        <Link
                            href={'/'}
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
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default RecentBlogs