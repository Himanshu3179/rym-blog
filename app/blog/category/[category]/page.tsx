import { getBlogsByCategory } from "@/app/actions";
import BlogCard from "@/components/BlogCard";

const CategoryPage = async (
    { params }: { params: { category: string } }
) => {
    const blogs = await getBlogsByCategory(params.category)
    return (
        <div className='w-full py-10 px-5 flex flex-col gap-5 bg-secondary '>
            <p className='text-center text-4xl '>#{params.category}</p>
            <div className='w-fit
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-4
        '>
                {blogs.length === 0 ? <p className='text-center'>No blogs yet</p>
                    : blogs.map((blog, index) => (
                        <BlogCard key={index} blog={blog} />
                    ))}
            </div>
        </div>
    );
};

export default CategoryPage;
