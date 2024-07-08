import { getAllBlogs, getName } from "@/app/actions";
import BlogCard from "@/components/BlogCard";
import CategoryCarousel from "@/components/CategoryCarousel";
import SearchInput from "@/components/SearchInput";
import TopBlogs from "@/components/TopBlogs";

export default async function Home() {
  const name = await getName();
  const blogs = await getAllBlogs();
  return (
    <div className="py-10  bg-secondary/10 h-full lg:px-20 px-5 flex flex-col gap-10">
      <CategoryCarousel />
      <div className="flex justify-center w-full 
        lg:flex-row flex-col  lg:gap-0 gap-5 items-center lg:items-start
      ">
        <div className="  max-w-sm flex flex-col gap-5">
          <SearchInput />
          <TopBlogs />
        </div>
        <div className="
            w-full
            grid
            lg:grid-cols-1
            xl:grid-cols-2
            gap-5
            lg:px-10
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
