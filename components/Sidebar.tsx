"use client"
import React, { useEffect } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Heart, Menu, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Kaushan_Script } from 'next/font/google'
const kaushan = Kaushan_Script({ weight: "400", subsets: ["latin"] });
const Sidebar = () => {
    const sideLinks = [
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
        <div className={`lg:hidden flex items-center`} >
            <Sheet>
                <SheetTrigger>
                    <Menu />
                </SheetTrigger>
                <SheetContent side={"left"} className=''>
                    <SheetClose asChild >
                        <Link
                            href={'/'}
                            className={`font-bold text-xl ${kaushan.className}
                            flex justify-center items-center
                            `}
                        >
                            Blog Website
                        </Link>
                    </SheetClose>

                    <div className={`flex flex-col gap-3 mt-10  ${kaushan.className}`}>
                        {sideLinks.map((link, index) => {
                            const isActive = pathname === link.href;
                            return (
                                <SheetClose asChild key={index}>
                                    <Link href={link.href}
                                        className={`text-lg  py-2 rounded-lg px-3
                                        ${isActive ? 'bg-rose-500 text-white' : 'secondary'}
                                        active:bg-rose-500 active:text-white
                                        `}
                                    >{link.name}</Link>
                                </SheetClose>
                            )
                        })}

                    </div>

                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Sidebar