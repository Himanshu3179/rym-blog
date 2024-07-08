import BlogForm from '@/components/BlogForm'
import BlogForm2 from '@/components/BlogForm2'
import React from 'react'
import { isAuthenticated } from '../actions'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const page = async () => {
    const authenticated = await isAuthenticated()
    if (!authenticated) {

        return (
            <div className=' py-10 flex flex-col gap-5 items-center justify-center'>
                <p className='text-center'>You are not authenticated</p>
                <Link href='/signup' className={`${buttonVariants({ variant: 'default' })}`}>
                    Login
                </Link>
            </div>
        )
    }
    return (
        <div className='w-full py-10 px-5 flex flex-col gap-5 '>
            <p className='text-center text-2xl font-bold'>Create Blog</p>
            <BlogForm2 />
        </div>
    )
}

export default page