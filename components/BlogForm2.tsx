"use client"
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import Tiptap from "./TipTap";
import RTE from "./RTE";
import categories from "@/lib/data/categories";

const FormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(300, 'Title is too long, Only 300 characters allowed'),
    content: z.string().min(1, 'Content is required'),

});


export default function BlogForm2() {


    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null);
    const [customCategory, setCustomCategory] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [category, setCategory] = useState<string>('');



    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: '',
            content: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        handleSubmit();
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)
            if (!file) {
                toast({
                    title: "Error",
                    description: "File is required",
                    variant: 'destructive'
                })
                return;
            }
            const finalCategory = category === "other" ? customCategory : category;
            console.log('finalCategory', finalCategory);
            console.log('category', category);
            const formData = new FormData();
            formData.append('file', file);
            const values = form.getValues();
            formData.append('title', values.title);
            formData.append('content', values.content);
            formData.append('category', finalCategory);

            const response = await fetch('api/blog', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json()
            if (response.ok) {
                toast({
                    title: "Success",
                    description: data.message,
                })
                router.push('/')
            }
            else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: 'destructive'
                })
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred",
                variant: 'destructive'
            })
        }
        finally {
            setLoading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };



    return (
        <div className='border p-5 rounded-lg bg-white/50 lg:w-3/4 w-full   mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    <div className="flex gap-5">
                        <div className='space-y-2 w-full'>
                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='Enter Title...' {...field}
                                                className='bg-transparent/10'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='space-y-2'>
                                <FormLabel>Image</FormLabel>
                                <input
                                    type="file"
                                    className=' rounded-md p-2 my-5 w-full bg-transparent/10'
                                    onChange={handleFileChange}
                                />
                            </div>


                            {/* image preview */}

                            <div className='my-2 w-full flex justify-center'>
                                {previewUrl && <Image src={previewUrl} alt="File preview" width={"300"} height={"100"} />}
                            </div>
                            <div>
                                <FormLabel>Select Category</FormLabel>
                                {/* drop down */}
                                <select
                                    className='w-full p-2 rounded-md bg-transparent/10'
                                    onChange={(e) => {
                                        console.log("hello")
                                        setCategory(e.target.value)
                                    }}
                                >
                                    {
                                        categories.map((category, index) => (
                                            <option key={index} value={category}>{category}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            {
                                category === "other" && (
                                    <div className=''>
                                        <FormLabel>Custom Category</FormLabel>
                                        <Input
                                            placeholder='Enter category...'
                                            value={customCategory}
                                            onChange={(e) => setCustomCategory(e.target.value)}
                                        />
                                    </div>
                                )
                            }
                            <div>
                                <FormLabel>Content</FormLabel>
                                <RTE name="content" control={form.control} defaultValue="" />

                            </div>
                        </div>
                        {/* <div className="w-1/4 p-5 bg-secondary">
                            <p className='text-2xl text-center font-bold '>Select Categories</p>
                        </div> */}
                    </div>
                    <Button className='w-fit mt-6 ' type='submit'
                        disabled={loading}
                    >
                        {
                            loading ? 'Creating...' : 'Create Blog'
                        }
                    </Button>
                </form>
            </Form>
        </div >
    );
}