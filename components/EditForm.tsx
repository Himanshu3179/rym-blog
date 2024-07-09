"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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


const FormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(300, 'Title is too long, Only 300 characters allowed'),
    content: z.string().min(1, 'Content is required'),

});


interface BlogProps {
    id: string;
    title: string;
    content: string;
    imageUrl: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    category: {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    };
}

export default function EditForm(
    { blog, apiKey }: { blog: BlogProps, apiKey: string }
) {


    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null);

    const [previewUrl, setPreviewUrl] = useState<string | null>(blog.imageUrl ? blog.imageUrl : null);
    const [category, setCategory] = useState<string>(blog.category ? blog.category.name : '');

    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: blog.title || '',
            content: blog.content || '',
        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        handleSubmit();
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            if (file) {
                formData.append('file', file);
            }
            const values = form.getValues();
            formData.append('title', values.title);
            formData.append('content', values.content);
            formData.append('category', category);
            formData.append('id', blog.id);

            const response = await fetch('/api/blog', {
                method: 'PUT',
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                toast({
                    title: "Success",
                    description: data.message,
                });
                router.push('/')

            } else {
                toast({
                    title: "Error",
                    description: data.message,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "An error occurred",
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };


    return (
        <div className='border p-5 rounded-lg  lg:w-3/4 w-full mx-auto
            bg-white/50
        '>
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

                            <div className=''>
                                <FormLabel>Category</FormLabel>
                                <Input
                                    placeholder='Enter category...'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                />
                            </div>

                            <div>
                                <FormLabel>Content</FormLabel>
                                <RTE name="content" control={form.control} defaultValue={blog.content} apiKey={apiKey} />
                            </div>
                        </div>
                    </div>
                    <Button className='w-fit mt-6 ' type='submit'
                        disabled={loading}
                    >
                        {
                            loading ? 'Updating...' : 'Update Blog'
                        }
                    </Button>
                </form>
            </Form>
        </div>
    );
}