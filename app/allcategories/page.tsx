import React from 'react'
import categories from '@/lib/data/categories'
import Link from 'next/link'
import { Inconsolata } from 'next/font/google';


const inconsolata = Inconsolata({ subsets: ["latin"] });

const page = () => {
    const colors = [
        "bg-red-300",
        "bg-blue-300",
        "bg-green-300",
        "bg-yellow-300",
        "bg-purple-300",
        // 1 more color
        "bg-pink-300",
    ]
    return (
        <div className='py-10 lg:px-20 px-5 flex flex-col items-center justify-center gap-10
            w-full 
        '>
            <p
                className='mx-auto text-2xl text-center font-bold'
            >All Categories</p>
            <div
                className='
                w-full
                grid
                grid-cols-2
                md:grid-cols-3
                lg:grid-cols-5
                gap-4
                '
            >
                {categories.map((category, index) => (
                    <Link
                        href={`/blog/category/${category.toLowerCase()}`}
                        key={index}
                        className={`
                        py-5
                        rounded-lg
                        
                        hover:text-indigo-900
                        hover:bg-opacity-70
                        transition-all

                        ${category.toLowerCase() === 'other' ? 'bg-gray-300' : colors[index % colors.length]}

                        `}
                    >
                        <div className="text-center">
                            <p className={`text font-bold ${inconsolata.className}`}>{category}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}

export default page