'use client';

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
import { Button } from '@/components/ui/button';

import { redirect, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

const FormSchema = z.object({
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(1, 'Message is required'),
});

const ContactForm = (
    { heading }: { heading?: string }
) => {
    const { toast } = useToast()
    const router = useRouter()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {

        },
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            const res = await fetch('/api/email', {
                method: 'POST',
                body: JSON.stringify(values),
            })
            if (res.ok) {
                toast({
                    title: "Success",
                    description: "Email sent",
                    variant: 'default'
                })
                // reset form after submission
                form.reset()
                router.push('/')
            }
            else {
                toast({
                    title: "Error",
                    description: "Email not sent",
                    variant: 'destructive'
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Email not sent",
                variant: 'destructive'
            })
        }
    };

    return (
        <div className="bg-secondary/70 border shadow-xl p-4 rounded-lg max-w-md w-full">
            <Form {...form} >
                <h1 className='text-2xl font-bold mb-5 text-center'>
                    {heading || 'Give Feedback'}
                </h1>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                    <div className='space-y-2'>
                        <FormField
                            control={form.control}
                            name='subject'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Title' {...field}
                                            className='bg-transparent/10'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='message'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder='Message'
                                            {...field}
                                            className='bg-transparent/10'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className='w-full mt-6' type='submit'
                        disabled={form.formState.isSubmitting}
                    >
                        {
                            form.formState.isSubmitting
                                ? 'Submitting...'
                                : 'Submit'
                        }
                    </Button>
                </form>
            </Form>
        </div>

    );
};

export default ContactForm;