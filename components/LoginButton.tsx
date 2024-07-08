import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '@/components/ui/button'
import { getName } from '@/app/actions'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export async function LoginButton() {
    const name = await getName();
    if (!name) {
        return (
            <Link
                href="/signin"
                className={`${buttonVariants({ variant: 'default' })}
                    focus:ring-0
                    focus:outline-none
                    focus:ring-transparent
                    focus:ring-offset-transparent
                    
                `}
            >
                Sign In
            </Link>

        )
    }

    return (
        <div className=''>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="rounded-full w-12 h-12 bg-white text-black flex justify-center items-center">
                        {name.charAt(0).toUpperCase()}
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuLabel>{name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link
                        href={'/profile'}
                    >
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                    </Link>

                    <Link
                        href={'/signout'}
                    >
                        <DropdownMenuItem className='text-red-600'>
                            Sign Out
                        </DropdownMenuItem>
                    </Link>

                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}

