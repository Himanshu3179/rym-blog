"use client"

import BlogCard from '@/components/BlogCard'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import useSWR from 'swr'

interface Blog {
    category: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
}

const fetchBlogs = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
}

const SearchPage = () => {

    const searchParams = useSearchParams();
    const searchQuery = searchParams ? searchParams.get('query') : null;
    const encodedQuery = encodeURIComponent(searchQuery || '');

    const { data: blogs, isLoading } = useSWR(`/api/search?query=${encodedQuery}`, fetchBlogs)

    return (
        <div>
            {
                isLoading ? <p>Loading...</p> :
                    blogs && blogs.length > 0 ? (
                        <div>
                            {
                                searchQuery ? <h1 className="text-2xl text-center mb-10">Search Results for{" "}
                                    <span className='font-bold'>{searchQuery}</span>
                                </h1>
                                    :
                                    <h1 className="text-2xl text-center mb-10">Search Results</h1>

                            }
                            <div className='w-fit
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                lg:grid-cols-3
                                gap-4
                            '>
                                {
                                    blogs.map((blog: Blog, index: number) => (
                                        <Link
                                            key={index}
                                            href={`/blog/${blog.id}`}
                                            className='
                                            max-w-md w-full rounded-lg flex flex-col
                                            max-h-[500px] h-full
                                            pb-20
                                            
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
                                                {new Date(blog.createdAt).toDateString()}
                                            </p>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    ) :
                        <div className='flex flex-col items-center justify-center gap-5'>
                            <p className='text-center text-2xl'>No blogs found for <span className='font-bold'>{searchQuery}</span>
                            </p>
                            <Link href='/search' className={`text-center 
                                ${buttonVariants({ variant: 'default' })}
                            `}>View all blogs</Link>
                        </div>
            }
        </div>
    )
}

export default SearchPage