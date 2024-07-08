import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link'
import categories from '@/lib/data/categories'
import { Inconsolata } from 'next/font/google';


const inconsolata = Inconsolata({ subsets: ["latin"] });

const CategoryCarousel = async () => {
    const colors = [
        "bg-red-300",
        "bg-blue-300",
        "bg-green-300",
        "bg-yellow-300",
        "bg-purple-300",
    ];

    return (
        <div className='w-full px-10 relative'>
            <p
                className='mx-auto text-2xl text-center mb-5 font-bold'
            >All Categories</p>
            <Carousel className="">
                <CarouselContent className="-ml-1">
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className={`pl-1 
                            sm:basis-1/2 
                        md:basis-1/3 lg:basis-1/4 xl:basis1/5 `}>
                            <Link
                                href={`/blog/category/${category.toLowerCase()}`}
                            >
                                <div className={`py-5 rounded-lg ${colors[index % colors.length]}
                                    hover:text-indigo-900
                                    hover:bg-opacity-70
                                    transition-all
                                `}>
                                    <div className="text-center">
                                        <p className={`text font-bold ${inconsolata.className}`}>{category}</p>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <Link
                href="/allcategories"
                className='
                absolute
                right-3 top-1 rounded-full
                bg-blue-500/40
                text-center
                px-3 py-2
                text-indigo-900
                hover:text-indigo-700
                hover:underline
                transition-all
                '
            >
                See All
            </Link>
        </div>
    )
}

export default CategoryCarousel