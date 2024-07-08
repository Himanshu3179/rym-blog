import { buttonVariants } from '@/components/ui/button'
import { ChevronsRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='  flex flex-col gap-'>
      <div className='lg:px-20 px-5 py-10 flex lg:flex-row flex-col lg:gap-20 items-center 
        gap-10
      '>
        <div className='lg:w-2/3 flex flex-col lg:gap-10 gap-5'>
          <p className='text-5xl font-bold'>
            Welcome to Our Blog
          </p>
          <p className='text-xl text-muted-foreground'>
            Explore a wealth of insights and perspectives from our team of expert writers. Our blog covers a wide range of topics, from industry trends to personal growth, all designed to inspire and inform our readers.
          </p>
        </div>
        <div className='lg:w-1/3'>
          <Image
            src={'/image.png'}
            alt='image'
            height={500}
            width={400}
            className='rounded-lg'
          />
        </div>
      </div>

      {/* Our Focus Areas*/}

      <div className="flex lg:flex-row flex-col 
      lg:px-20 px-5 py-10 bg-white/60
      gap-10 items-center
      ">
        <div className='lg:w-1/2 flex flex-col gap-10'>
          <p className='text-4xl font-bold'>
            Our Focus Areas
          </p>
          <p className='text-xl text-muted-foreground'>
            Our blog covers a wide range of topics, from technology and business to personal development and lifestyle. We&#39;re passionate about sharing insights and practical advice to help our readers grow and succeed.
          </p>
        </div>

        <div className='lg:w-1/2 flex flex-col gap-5'>
          <div className='flex flex-col gap-1'>
            <p className='text-2xl font-bold'>
              Technology
            </p>
            <p className='text-lg text-muted-foreground'>
              Stay up-to-date with the latest trends and innovations in the tech industry.</p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-2xl font-bold'>
              Business
            </p>
            <p className='text-lg text-muted-foreground'>
              Discover strategies and insights to help your business thrive.</p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-2xl font-bold'>
              Personal Growth
            </p>
            <p className='text-lg text-muted-foreground'>
              Explore topics that can help you unlock your full potential.</p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-2xl font-bold'>
              Lifestyle
            </p>
            <p className='text-lg text-muted-foreground'>
              Get inspired by articles on health, wellness, and more.</p>

          </div>
        </div>
      </div>


      {/* Explore Our Blog */}
      <div className='lg:px-20 px-5 py-10 flex flex-col gap-10 items-center '>
        <p className='text-4xl font-bold text-center'>
          Explore Our Blog
        </p>
        <p className='text-lg text-muted-foreground text-center'>
          Our blog is a treasure trove of insights and inspiration.
          <br />
          Browse through our latest articles and discover content that resonates with you.
        </p>

        <Link href='/allblogs'
          className={`${buttonVariants({ variant: 'default' })}`}
        >
          Explore Blogs <ChevronsRight />
        </Link>

      </div>


    </div >
  )
}

export default page

