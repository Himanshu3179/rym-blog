import { getAllBlogs, getName } from "@/app/actions";
import BlogCard from "@/components/BlogCard";
import AllCategories from "@/components/Home/AllCategories";
import SearchInput from "@/components/SearchInput";
import TopBlogs from "@/components/TopBlogs";

export default async function Home() {
  const name = await getName();
  const blogs = await getAllBlogs();
  return (
    <div className="py-20 flex  bg-secondary h-full px-20 gap-8">
      <div className=" w-1/3 max-w-sm flex flex-col gap-5">
        <SearchInput />
        <AllCategories />
        <TopBlogs />
      </div>
      <div className=" w-2/3 
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
  );
}
