import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { getAllCategories } from '@/app/actions'
import Link from 'next/link'

const CategoryCarousel = async () => {
    let categories = await getAllCategories()
    if (!categories || categories.length === 0) return null;
    const colors = [
        "bg-red-300",
        "bg-blue-300",
        "bg-green-300",
        "bg-yellow-300",
        "bg-purple-300",
    ];

    return (
        <div className='w-full px-10'>
            <p
                className='mx-auto text-2xl text-center mb-5 font-bold'
            >All Categories</p>
            <Carousel className="">
                <CarouselContent className="-ml-1">
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className={`pl-1 md:basis-1/2 lg:basis-1/4 `}>
                            <Link
                                href={category.name === 'All' ? '/blog' : `/blog/category/${category.name}`}
                            >
                                <div className={`py-5 rounded-lg ${colors[index % colors.length]}`}>
                                    <div className="text-center">
                                        <p className="text-sm font-bold">#{category.name}</p>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel