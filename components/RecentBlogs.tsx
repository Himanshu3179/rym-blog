import { getRecentBlogs } from '@/app/actions'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const RecentBlogs = async (
    { exceptId }: { exceptId?: string }
) => {
    const blogs = await getRecentBlogs();
    return (
        <div className='flex flex-col gap-5 text-black bg-indigo-200 py-7 px-3 shadow-md rounded-lg  '>
            <div className='flex flex-col gap-2 font-bold'>
                {
                    blogs.map((blog, i) => {
                        if (exceptId && blog.id === exceptId) {
                            return null;
                        }
                        return (

                            <Link
                                href={`/blog/${blog.id}`}
                                key={i} className='flex gap-5
                        py-2 px-4 rounded-lg 
                        hover:bg-secondary 
                        transition-all
                        '>
                                <p className='text-3xl'>{i + 1}</p>
                                <div>
                                    <p
                                        className='line-clamp-2'
                                    >{blog.title}{'...'}</p>
                                    <p className='text-sm text-muted-foreground font-semibold'>{blog.createdAt.toDateString()}</p>
                                </div>
                                <Image src={blog.imageUrl} alt={blog.title} width={100} height={50}
                                    className='rounded-lg ml-auto h-[50px] object-cover'
                                    quality={30}
                                />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RecentBlogs