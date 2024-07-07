import CategoryCarousel from '@/components/CategoryCarousel';
import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className=' max-w-screen overflow-hidden pt-10'>
            <CategoryCarousel />
            {children}
        </div>
    )
}

export default layout