import React, { useEffect, useState } from "react";
import data from "../../assets/home-page/studnet.jpg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useRequest from "@/hooks/useRequest";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import type { ICategory } from "@/@types/categoryType";
import type { ICourse } from "@/@types/courseType";
import userRoutes from "@/service/endPoints/userEndPoints";
import toast from "react-hot-toast";

interface Props {
  handleCourse: (courses: ICourse[]) => void;
  handlePage: (page: number) => void;
  page:number
}

const FilterHeader: React.FC<Props> = ({
  handleCourse,
  handlePage,
  page
}) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const { doRequest, err } = useRequest();

  useEffect(() => {
    doRequest({
      url: instructorRoutes.getCategoryies,
      method: "get",
      body: {},
      onSuccess: (data) => {
        setCategories(data);
      },
    });
  }, [search]);

  useEffect(() => {
    doRequest({
      url:`${userRoutes.getCourses}?category=${category}&&page=${page}&&search=${search}&&topic=${topic}&&level=${level}&&sort=${sort}`,
      method: "get",
      body: {},
      onSuccess: (data) => {
        console.log('data.pages',data.pages)
        handleCourse(data.courses);
        handlePage(data.pages);
      },
    });
  }, [search,category,topic,level,sort,page]);
  
  useEffect(()=>{
     err?.map((err)=>toast.error(err.message));
  },[err])

  return (
    <div
      className="container-fluid mx-auto h-52 flex justify-center items-center gap-4 p-4 "
      style={{
        backgroundImage: `linear-gradient(rgba(73, 187, 189, 0.5),rgba(73, 187, 189, 0.5)), url(${data})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-3/4  flex flex-col gap-4">
        <input
          type="search"
          id="search"
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Serach course here..."
          className="bg-white py-2 rounded-2xl px-2"
        />

        <div  className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Select
            onValueChange={(value) => {
              setCategory(value);
              if(value == "All") {
                setTopic("")
                return  setTopics([])
              }
              categories.filter((val)=>{
                if(val.title == value){
                    setTopics(val.topics)
                    return;
                }
              })
            }}
          >
            <SelectTrigger className="md:text-sm  w-full text-xs bg-white">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value={"All"}>All</SelectItem>
                {categories.map((value: ICategory) => (
                  <SelectItem key={value._id} value={value.title}>
                    {value.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setTopic(value)}>
            <SelectTrigger className="md:text-sm  w-full text-xs bg-white">
              <SelectValue placeholder="Select a Topic..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Topic</SelectLabel>
                {topics.length > 0 ? (
                  <>
                    <SelectItem value={"All"}>All</SelectItem>
                    {topics.map((val, index) => (
                      <SelectItem key={index} value={val}>
                        {val}
                      </SelectItem>
                    ))}
                  </>
                ) : (
                  <SelectLabel>No Topics available</SelectLabel>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setLevel(value)}>
            <SelectTrigger className="md:text-sm  w-full text-xs bg-white">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Level</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediat">Intermediat</SelectItem>
                <SelectItem value="Advance">Advance</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={(value) => setSort(value)}>
            <SelectTrigger className="md:text-sm  w-full text-xs bg-white">
              <SelectValue placeholder="Sort " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort</SelectLabel>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Price Low to High">
                  Price Low to High
                </SelectItem>
                <SelectItem value="Price High to Low">
                  Price High to Low
                </SelectItem>
                <SelectItem value="Old">Old</SelectItem>
                <SelectItem value="New">New</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FilterHeader);
