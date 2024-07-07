import React from 'react'

const Background = () => {
    return (
        <>
            <div
                className='fixed -z-20 bg-rose-500 
                w-52 h-52
                top-1/2 left-1/2
                transform -translate-x-1/2 -translate-y-1/2
                rounded-full
                blur-[150px]

                '
            />
            <div
                className='fixed -z-10 bg-red-500
                w-72 h-72
                top-0 left-0
            rounded-full
            blur-[200px]
            '
            />


            <div
                className='fixed  -z-10 bg-blue-500
                w-72 h-72
            bottom-0 right-0
            rounded-full
            blur-[200px]
            '
            />

        </>

    )
}

export default Background