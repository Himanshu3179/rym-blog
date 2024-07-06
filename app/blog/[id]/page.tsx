import { getBlogById } from '@/app/actions'
import RecentBlogs from '@/components/RecentBlogs'
import SingleBlog from '@/components/SingleBlog'
import React from 'react'

const page = async (
    { params }: { params: { id: string } }
) => {
    
    return (
        <div className='w-full py-10 px-5 flex gap-5'>
            <div className='w-2/3'>
                <SingleBlog blogId={params.id} />
            </div>
            <div className='w-1/3 bg-secondary p-5 rounded-lg flex flex-col gap-5'>
                <p className='text-2xl text-center font-bold text-indigo-950'>Read Other Blogs</p>
                <RecentBlogs />
            </div>
        </div>
    )
}

export default page