"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';


interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

const FormSchema = z
    .object({
        name: z.string().optional(),
    });

const ProfileForm = () => {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '',
        },
    });

    const [userData, setUserData] = useState<User | null>(null);
    const [fetching, setFetching] = useState(false);

    const fetchUserDetails = async () => {
        try {
            setFetching(true);
            const res = await fetch('/api/user');
            const data = await res.json();
            if (res.ok) {
                setUserData(data);
                form.reset({
                    name: data.name,
                });
            }
            else {
                toast({
                    title: "Not Logged In",
                    description: data.message,
                    variant: 'destructive'
                })
                router.push('/login')
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Something went wrong",
                description: "Failed to fetch user details",
                variant: 'destructive'
            })
        }
        finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {

        const response = await fetch('api/user/', {
            method: 'PUT',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            toast({
                title: "Success",
                description: "Profile updated successfully",
            })
            window.location.reload();
        } else {
            const data = await response.json()
            toast({
                title: "Error",
                description: data.message,
                variant: 'destructive'
            })
        }
    };

    if (fetching) return (
        <div className='text-center'>Loading...</div>
    )

    if (!userData) {
        return (
            <div>
                <h1 className='text-2xl font-semibold mb-4 mx-auto w-fit'>Profile</h1>
                <div className='text-center'>User not found</div>
            </div>
        )
    }


    return (
        <div className="p-5 max-w-lg border mx-auto w-full 
            bg-gradient-to-br from-purple-200 via-pink-200 to-red-200
        ">
            <h1 className='text-2xl font-semibold mb-4 mx-auto w-fit'>Profile</h1>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    <div className='space-y-2'>
                        <div className='bg-white text-black border border-black font-bold  p-5 rounded-full w-20 h-20
                            flex items-center justify-center 
                            mx-auto
                        '>
                            <div className='text-lg font-semibold'>{userData.name.charAt(0).toUpperCase()}</div>
                        </div>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Your name' {...field} readOnly
                                            className=' text-muted-foreground cursor-not-allowed' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Your email' value={userData.email} readOnly
                                    className=' text-muted-foreground cursor-not-allowed'
                                />
                            </FormControl>
                        </FormItem>

                    </div>
                    <p className='mt-6 text-sm flex gap-4'>
                        <span className=' font-semibold'>
                            Joined on:
                        </span>
                        <Badge  >
                            {new Date(userData.createdAt).toDateString()}
                        </Badge>
                    </p>
                    {/* <Button className='w-full mt-6' type='submit'
                        disabled={form.formState.isSubmitting}
                    >
                        Update
                    </Button> */}
                </form>
            </Form>
        </div>
    );
};

export default ProfileForm;