import ContactForm from '@/components/ContactForm'
import React from 'react'

const page = () => {
    return (
        <div className='py-10  flex justify-center items-center w-full
        lg:px-20 px-5
        '>
            <ContactForm
                heading={"Contact Us"}
            />
        </div>
    )
}

export default page