import { getAllBlogs, getName } from "@/app/actions";
import BlogCard from "@/components/BlogCard";
import CategoryCarousel from "@/components/CategoryCarousel";
import AllCategories from "@/components/Home/AllCategories";
import SearchInput from "@/components/SearchInput";
import TopBlogs from "@/components/TopBlogs";

export default async function Home() {
  const name = await getName();
  const blogs = await getAllBlogs();
  return (
    <div className="py-10  bg-secondary/50 h-full lg:px-20 px-5 flex flex-col gap-10">
      <CategoryCarousel />
      <div className="flex gap-8 justify-center">
        <div className=" w-1/3 max-w-sm flex-col gap-5
          hidden xl:flex
        ">
          <SearchInput />
          <TopBlogs />
        </div>
        <div className="lg:w-2/3 
            w-full
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-5
          ">
          {
            blogs.length === 0 ? <p className='text-center'>No blogs yet</p>
              :
              blogs.map((blog, index) => (
                <BlogCard key={index} blog={blog} />
              ))}
        </div>
      </div>
    </div>
  );
}
