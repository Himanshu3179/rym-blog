"use client"
import { Merriweather_Sans } from 'next/font/google';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const merriweatherSans = Merriweather_Sans({ subsets: ["latin"] });

const NavLinks = () => {
    const links = [
        {
            name: 'Home',
            href: '/'
        },
        {
            name: 'About',
            href: '/about'
        },
        {
            name: 'All Blog',
            href: '/allblogs'
        },
        {
            name: 'Create Blog',
            href: '/createblog'
        },
        {
            name: 'All Categories',
            href: '/allcategories'
        },
        {
            name: 'Contact',
            href: '/contact'
        }
    ]

    const pathname = usePathname();


    return (
        <div className={`lg:flex gap-5 items-center hidden text-black
            ${merriweatherSans.className}
        `}>
            {links.map((link, index) => (
                <Link key={index} href={link.href}
                    className={`text-lg
                        ${pathname === link.href ? 'font-semibold  underline' : ''}
                         hover:scale-110
                        transition-all
                        hover:mb-1
                            
                    `}
                >{link.name}</Link>
            ))}
        </div>
    )
}

export default NavLinks