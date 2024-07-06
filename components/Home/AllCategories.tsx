import { getAllCategories } from '@/app/actions'
import Link from 'next/link'
import React from 'react'

const AllCategories = async () => {
    let categories = await getAllCategories()

    if (!categories || categories.length === 0) return (
        <div className='flex flex-col gap-5 text-indigo-900 p-7 shadow-md rounded-lg bg-white '>
            <p className='text-2xl text-center font-bold '>Categories</p>
            <div className='flex flex-row flex-wrap gap-2 font-bold justify-evenly  '>
                <Link href='/allblogs' className='hover:bg-gray-200 p-2 rounded-md cursor-pointer'>All</Link>
            </div>
        </div >
    )
    // only get the first 10 categories
    categories = categories.slice(0, 10)

    return (
        <div className='flex flex-col gap-5 text-indigo-900 p-7 shadow-md rounded-lg bg-white '>
            <p className='text-2xl text-center font-bold '>Categories</p>
            <div className='flex flex-row flex-wrap gap-2 font-bold justify-evenly  '>
                {categories.map((category, index) => (
                    <Link href={category.name === 'All' ? '/blog' : `/blog/category/${category.name}`}
                        key={index}
                        className='hover:bg-gray-200 p-2 rounded-md cursor-pointer underline'
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
        </div >
    )
}

export default AllCategories