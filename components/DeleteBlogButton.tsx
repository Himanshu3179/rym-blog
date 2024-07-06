"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'

const DeleteBlogButton = (
    { blogId }: { blogId: string }
) => {
    const [deleting, setDeleting] = React.useState(false)
    const { toast } = useToast();
    const router = useRouter()
    async function handleDelete() {
        try {
            setDeleting(true)
            const res = await fetch('/api/blog', {
                method: 'DELETE',
                body: JSON.stringify({ id: blogId }),
            })
            const data = await res.json()
            if (res.ok) {
                toast({
                    title: 'Success',
                    description: data.message,
                })
                router.refresh()
                router.push('/')
            }
            else {
                toast({
                    title: 'Error',
                    description: data.message,
                })
            }
        } catch (error) {
            console.error(error)
            toast({
                title: 'Error',
                description: 'An error occurred',
            })
        }
        finally {
            setDeleting(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className='bg-red-600 text-white px-3 py-1 rounded-md'>Delete</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <div className='flex items-center gap-3 justify-end'>
                    <DialogClose asChild>
                        <Button variant={'outline'}>Cancel</Button>
                    </DialogClose>
                    <Button variant={'destructive'}
                        onClick={handleDelete}
                        disabled={deleting}
                    >
                        {deleting ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </DialogContent>

        </Dialog>
    )
}

export default DeleteBlogButton