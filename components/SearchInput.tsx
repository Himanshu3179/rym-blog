"use client"
import React, { Suspense, useRef, useState, useEffect } from 'react'
import { CircleX, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

// New component that directly uses useSearchParams
const SearchInputContent = () => {
    const searchParams = useSearchParams()
    const [searchValue, setSearchValue] = useState<string>("")
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    const searchQuery = searchParams ? searchParams.get('query') : null;
    useEffect(() => {
        if (searchQuery) {
            setSearchValue(searchQuery)
        }
    }, [searchQuery])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const query = formData.get('search') as string
        router.push(`/search?query=${query}`)
    }

    return (
        <form className="relative" onSubmit={handleSearch} ref={formRef}>
            <div className='p-1 rounded-full  shadow-md
                bg-gradient-to-tr from-purple-300 via-pink-300 to-red-300
            '>
                <input type="text" className="py-4 px-5 pr-12 rounded-full bg-white/50  w-full
                    
focus:ring-0
                    focus:outline-none
                    focus:ring-transparent
                    focus:ring-offset-transparent
                    
                " placeholder="Search"
                    name="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
            <Search className={`absolute right-5 top-5 text-muted-foreground
                    ${searchValue ? 'hidden' : 'block'}
                `} size={20}
            />
            <CircleX
                size={20}
                className={`absolute right-5 top-5 text-muted-foreground
                    ${searchValue ? 'block' : 'hidden'}
                    `}
                onClick={() => {
                    setSearchValue('')
                    formRef.current?.submit();
                }}
            />
            <p className='text-center text-muted-foreground text-sm mt-2'>Press Enter to search</p>
        </form>
    )
}

// Wrapper component that uses Suspense to handle the loading state
const SearchInput = () => {


    return (
        <Suspense fallback={<div>Loading search...</div>}>
            <SearchInputContent />
        </Suspense>
    )
}

export default SearchInput