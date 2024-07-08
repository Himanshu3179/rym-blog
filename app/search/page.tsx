"use client"

import BlogCard from '@/components/BlogCard'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'
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

const SearchPageContent = (
    { searchQuery }: { searchQuery: string }
) => {

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
                                            p-[2px]
                                            
                                            bg-gradient-to-r from-purple-300 via-pink-300 to-red-300
                                        '>
                                            <div className='p-5 rounded-lg bg-white/60 w-full h-full'>
                                                <div className='relative  overflow-hidden rounded-lg'>
                                                    <Image
                                                        src={blog.imageUrl}
                                                        alt={blog.title}
                                                        width={400}
                                                        height={200}
                                                        className=' w-full rounded-lg object-cover h-[200px] z-20
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
                                                    <Badge className='bg-rose-500'>
                                                        {blog.category.name}
                                                    </Badge>
                                                    <p className=' text-sm font-semibold text-muted-foreground'>
                                                        {new Date(blog.createdAt).toDateString()}
                                                    </p>
                                                </div>
                                                <p className='text-xl font-bold 
                                                        my-2
                                                        hover:text-indigo-900
                                                        line-clamp-2
                                                    '>{blog.title}{' ...'}</p>

                                                <div
                                                    className='text-sm text-muted-foreground
                                                    line-clamp-2                
                                                    '
                                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                                />
                                            </div>
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

const SearchPage = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams ? searchParams.get('query') ?? '' : '';

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchPageContent
                searchQuery={searchQuery}
            />
        </Suspense>
    );
}

export default SearchPage