import { getName } from '@/app/actions'
import Link from 'next/link'
import React from 'react'
import NavLinks from '@/components/NavLinks'
import { LoginButton } from '@/components/LoginButton'
import Sidebar from './Sidebar'

const Navbar = async () => {
    const name = await getName()
    return (
        <div className={`
                bg-gradient-to-r from-purple-300 via-pink-300 to-red-300
            flex justify-between w-full px-5 py-2 items-center border-b-2 shadow-md
        bg-secondary/50
        
        `}>
            <Sidebar />
            <Link
                href='/'
                className='font-bold
                    flex-1
                    lg:ml-0
                    ml-3
                    text-lg
                    hover:text-indigo-900
                '>Blog Website</Link>
            <div className='flex gap-5'
            >
                <NavLinks />
                <LoginButton />
            </div>
        </div>
    )
}

export default Navbar