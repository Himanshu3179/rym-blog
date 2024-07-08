import { getBlogsByCategory } from "@/app/actions";
import BlogCard from "@/components/BlogCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CategoryPage = async (
    { params }: { params: { category: string } }
) => {
    const blogs = await getBlogsByCategory(params.category)
    return (
        <div className='w-full py-10 px-5 flex flex-col gap-5  '>
            <p className='text-center text-4xl '>#{params.category}</p>
            <div className='w-fit
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-4
        '>
                {blogs.length === 0 ?
                    <div className="w-full flex flex-col gap-5 ">
                        <p className=''>No blogs yet on{" "}
                            <span className="font-bold underline">{params.category}</span>
                        </p>
                        <Link
                            href="/createblog"
                            className={`flex items-center gap-3 w-fit
                            ${buttonVariants({ variant: "default" })}
                        `}>Create One
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                    : blogs.map((blog, index) => (
                        <BlogCard key={index} blog={blog} />
                    ))}
            </div>
        </div>
    );
};

export default CategoryPage;
