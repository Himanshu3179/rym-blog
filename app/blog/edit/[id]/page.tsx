import { getBlogById, isAuthorOfBlog } from '@/app/actions'
import EditForm from '@/components/EditForm';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async (
    { params }: { params: { id: string } }
) => {
    // is author of blog 
    const isAuthor = await isAuthorOfBlog(params.id);

    if (!isAuthor) {
        redirect(`/blog/${params.id}`);
    }

    const blog = await getBlogById(params.id);
    if (!blog) {
        redirect('/');
    }

    const TinyMCE_API_KEY = process.env.TinyMCE_API_KEY as string
    return (
        <div className='w-full py-10 px-5 flex flex-col gap-5 '>
            <p className='text-center text-2xl font-bold'>Edit Blog</p>
            <EditForm
                blog={blog}
                apiKey={TinyMCE_API_KEY}
            />
        </div>
    )
}

export default page