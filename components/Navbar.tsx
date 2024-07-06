import { getName } from '@/app/actions'
import Link from 'next/link'
import React from 'react'
import NavLinks from '@/components/NavLinks'
import { LoginButton } from '@/components/LoginButton'

const Navbar = async () => {



    const name = await getName()
    return (
        <div className={`flex justify-between w-full px-5 py-2 items-center border-b-2 shadow-md
        bg-secondary/50
        `}>
            <Link
                href='/'
                className='font-bold'>News Website</Link>
            <div className='flex gap-5'
            >
                <NavLinks />
                <LoginButton />

            </div>
        </div>
    )
}

export default Navbar