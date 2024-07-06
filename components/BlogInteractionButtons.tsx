"use client"
import { BookmarkPlus, ExternalLink, Heart, MessageCircle } from 'lucide-react'
import React, { useEffect } from 'react'
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';


interface Blog {
    id: string;
    likes: {
        user: {
            id: string;
            email: string;
            name: string;
            password: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
    }[];
    comments: {
        id: string;
    }[];
}



const BlogInteractionButtons = (
    { blog, userId }: { blog: Blog, userId: string | null }
) => {
    const [url, setUrl] = React.useState('');
    const [isLiked, setIsLiked] = React.useState(blog.likes.some(like => like.user?.id === userId));
    const [likesCount, setLikesCount] = React.useState(blog.likes.length);
    const [totalComments, setTotalComments] = React.useState(blog.comments.length)
    const { toast } = useToast()
    const router = useRouter();

    const handleLike = async () => {
        // Optimistically update the UI
        setIsLiked(prevIsLiked => !prevIsLiked);
        setLikesCount(prevLikesCount => isLiked ? prevLikesCount - 1 : prevLikesCount + 1);
        try {
            const response = await fetch(`/api/blogs/${blog.id}/like`, {
                method: 'POST',
            });
            const newblog = await response.json();
            console.log(newblog);
            if (!response.ok) {
                // rollback the UI changes
                setIsLiked(prevIsLiked => !prevIsLiked);
                setLikesCount(prevLikesCount => isLiked ? prevLikesCount + 1 : prevLikesCount - 1);
                toast({
                    title: "Error",
                    description: newblog.message,
                    variant: 'destructive'
                });
            }
        } catch (error) {
            console.error(error);
            // Rollback the UI changes
            setIsLiked(prevIsLiked => !prevIsLiked);
            setLikesCount(prevLikesCount => isLiked ? prevLikesCount + 1 : prevLikesCount - 1);
            toast({
                title: "Error",
                description: "An error occurred while liking the blog",
                variant: 'destructive'
            });
        } finally {
            router.refresh();
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        toast({
            title: 'Link copied to clipboard',
            description: 'You can now share this link with your friends',
        })
    }

    useEffect(() => {
        setUrl(`${window.location.href}`)
    }, [])


    return (
        <div className='flex justify-between max-w-lg w-full mx-auto bg-secondary p-5 rounded-full'>
            <div className='flex gap-5'>
                <div className='flex gap-2'>
                    <Heart size={20}
                        onClick={handleLike}
                        fill={isLiked ? 'red' : 'none'}
                        // set outline of an icon when not liked
                        stroke={isLiked ? 'red' : 'black'}
                        className='cursor-pointer
                            hover:scale-125
                            transition-transform
                            duration-300
                        '
                    />
                    <span>
                        {likesCount}
                    </span>
                </div>
                <div className='flex gap-2'>
                    <MessageCircle size={20} />
                    <span>
                        {totalComments}
                    </span>
                </div>
            </div>
            <div>
                <span>5 min read</span>
            </div>
            <div className='flex gap-5'>
                <BookmarkPlus size={20} />
                <ExternalLink size={20}
                    onClick={handleCopy}
                    className='cursor-pointer
                        hover:scale-110
                        transition-transform
                        duration-300
                        '
                />
            </div>
        </div>
    )
}

export default BlogInteractionButtons