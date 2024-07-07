"use client"
import { CircleX, Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useRef } from 'react'

const SearchInput = () => {
    const [searchValue, setSearchValue] = React.useState<string>("")
    const searchParams = useSearchParams()
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null); // Create a ref for the form

    const searchQuery = searchParams ? searchParams.get('query') : null;


    React.useEffect(() => {
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
        <form className="relative" onSubmit={handleSearch}>
            <input type="text" className="py-4 px-5 pr-12 rounded-full bg-white/50 shadow-md w-full" placeholder="Search"
                name="search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Search className={`absolute right-5 top-4 text-muted-foreground
                    ${searchValue ? 'hidden' : 'block'}
                `} size={20}
            />
            <CircleX
                size={20}
                className={`absolute right-5 top-4 text-muted-foreground
                    ${searchValue ? 'block' : 'hidden'}
                    `}
                onClick={() => {
                    setSearchValue('')
                    formRef.current?.submit(); // Programmatically submit the form

                }}
            />
            <p className='text-center text-muted-foreground text-sm mt-2'>Press Enter to search</p>
        </form>
    )
}

export default SearchInput