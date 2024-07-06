import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className=' max-w-screen overflow-hidden '>
            {children}
        </div>
    )
}

export default layout