import SearchInput from '@/components/SearchInput';
import React from 'react'

const layout = (
    {
        children,
    }: Readonly<{
        children: React.ReactNode;
    }>
) => {
    return (
        <div className=' max-w-screen overflow-hidden md:px-10 px-5 py-10'>
            <div className='max-w-lg w-full mx-auto mb-10'>
                <SearchInput />
            </div>
            {children}
        </div>
    )
}

export default layout