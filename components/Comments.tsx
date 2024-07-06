"use client"
import React, { useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

interface Blog {
    id: string;
    comments: {
        id: string;
        user: {
            id: string;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        } | null;
        content: string;
        createdAt: Date;
    }[];
}
const Comments = (
    { blog, userId }: { blog: Blog, userId: string | null }
) => {
    const sampleComments = [
        {
            id: '1',
            user: {
                id: '1',
                email: 'a@gmail.com',
                name: 'John Doe',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            content: 'This is a sample comment',
            createdAt: new Date()
        },
        {
            id: '2',
            user: {
                id: '1',
                email: 'a@gmail.com',
                name: 'John Doe',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            content: 'This is a sample comment',
            createdAt: new Date()
        },
        {
            id: '3',
            user: {
                id: '1',
                email: 'a@gmail.com',
                name: 'John Doe',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            content: 'This is a sample comment',
            createdAt: new Date()
        },

    ]
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(blog.comments);
    const [isCommenting, setIsCommenting] = useState(false);
    const { toast } = useToast()
    const router = useRouter();


    const handleComment = async () => {
        try {
            setIsCommenting(true);
            if (!userId) {
                toast({
                    title: "Authentication Required",
                    description: "Please log in to comment.",
                    variant: 'destructive',
                });
                return;
            }

            if (!commentText) {
                toast({
                    title: "Error",
                    description: "Comment is required",
                    variant: 'destructive',
                });
                return;
            }

            const response = await fetch(`/api/blogs/${blog.id}/comment`, {
                method: 'POST',
                body: JSON.stringify({ comment: commentText }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const newComment = await response.json();
            if (!response.ok) {
                toast({
                    title: "Error",
                    description: newComment.message,
                    variant: 'destructive',
                })
            }
            setComments(prevComments => [newComment, ...prevComments]);
            setCommentText('');
            router.refresh();
        }

        catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred while commenting on the blog",
                variant: 'destructive'
            });
        } finally {
            setIsCommenting(false);
        }





    };



    return (
        <div className='w-full bg-primary/10 rounded-xl p-5 flex flex-col gap-5'>

            <form className='flex gap-5 items-center'>
                <Input placeholder='Add a comment...'
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    disabled={isCommenting}
                />
                <Button
                    onClick={handleComment}
                    disabled={isCommenting}
                >
                    {isCommenting ? 'Commenting...' : 'Comment'}
                </Button>
            </form>

            {isCommenting && <p className="text-center">Posting comment...</p>}

            <hr />
            <div className='flex flex-col gap-3'>
                {
                    blog.comments.length === 0 ? <p className='text-center'>No comments yet</p>
                        :
                        blog.comments.map(comment => (
                            <div key={comment.id} className='bg-secondary p-5 rounded-lg flex flex-col gap-3'>
                                <div className="flex justify-between items-center">
                                    <div className='flex items-center gap-3'>
                                        <p className='w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold
                                '>
                                            {comment.user?.name.charAt(0).toUpperCase()}
                                        </p>
                                        <p className='text-lg font-bold'>{comment.user?.name}</p>
                                    </div>
                                    <p className='text-sm text-muted-foreground'>{new Date(comment.createdAt).toDateString()}</p>
                                </div>
                                <hr />
                                <p>{comment.content}</p>
                            </div>
                        ))}
            </div>

        </div>
    )
}

export default Comments