import { getBlogById } from '@/app/actions'
import RecentBlogs from '@/components/RecentBlogs'
import SingleBlog from '@/components/SingleBlog'
import React from 'react'

const page = async (
    { params }: { params: { id: string } }
) => {

    return (
        <div className='w-full py-10 px-3 lg:px-5  gap-5
            flex 
            xl:flex-row
            flex-col

        '>
            <div className='
            lg:w-2/3
            w-full
            '>
                <SingleBlog blogId={params.id} />
            </div>
            <div className='w-[2px] border-r '></div>
            <div className='
            lg:w-1/3            
            w-full
             rounded-lg flex flex-col gap-5'>
                <p className='text-2xl text-center font-bold text-indigo-950'>Read Other Blogs</p>
                <RecentBlogs
                    exceptId={params.id}
                />
            </div>
        </div>
    )
}

export default page