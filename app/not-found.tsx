import { buttonVariants } from '@/components/ui/button'
import { ChevronsRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
    return (
        <div className='py-10 lg:px-20 px-5 flex flex-col justify-center items-center'>
            <p className='text-4xl font-bold text-center'>
                404 Not Found
            </p>
            <p className='text-lg text-muted-foreground text-center mt-5'>
                The page you are looking for does not exist.
            </p>
            <Link href='/allblogs'
                className={`${buttonVariants({ variant: 'default' })} w-fit mt-10`}
            >
                Explore Blogs <ChevronsRight />
            </Link>
        </div>
    )
}

export default NotFound