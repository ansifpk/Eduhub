import { Button } from "../ui/button";
import data from "../../assets/home-page/studnet.jpg";
import { ICategory } from "../../@types/categoryTpe";
import { ICourse } from "../../@types/courseType";
import { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import userRoutes from "../../service/endPoints/userEndPoints";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  categories: ICategory[];
  onsendcourse: (courses: ICourse[]) => void;
  onsendpages: (pages: number) => void;
  page: number;
}
const FilterHeader: React.FC<Props> = ({
  categories,
  onsendcourse,
  onsendpages,
  page,
}) => {
  const [topics, setTopics] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const { doRequest, errors } = useRequest();

  useEffect(() => {
    doRequest({
      url: `${userRoutes.getCourses}?category=${category}&&topic=${topic}&&level=${level}&&search=${search}&&sort=${sort}&&page=${page}`,
      body: {},
      method: "get",
      onSuccess: (response) => {
        onsendcourse(response.courses);
        onsendpages(response.pages);
      },
    });
     
    const cate = async () => {
      categories.filter((val) => {
        if (category.length > 0) {
          if (val.title == category) {
            setTopics(val.topics);
          }
        }
      });
    };
    cate();
  }, [categories, category, topic, level, search, search, sort, page]);
  useEffect(() => {
    errors?.map((err) => toast.error(err.message));
  }, [errors]);
 
  
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(
          rgba(73, 187, 189, 0.5),
      rgba(73, 187, 189, 0.5)
        ), url(${data})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="h-52 flex flex-col items-center justify-center gap-4 p-4 "
    >
      <div className="w-75 md:w-1/2 flex bg-white border rounded">
        <Input
          type="text"
          className="m-1 md:text-sm lg:text-sm text-xs"
          placeholder="Search courses here..."
          aria-label="Search courses"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          type="button"
          className="bg-[#49BBBD] text-white m-1 md:text-sm text-xs"
        >
          Search
        </Button>
      </div>
      <div className="  flex w-75 md:w-1/2 gap-5">
        <div className=" flex-1">
          <Select
            onValueChange={(value) => {
              setCategory(value);
            }}
          >
            <SelectTrigger className="md:text-sm w-full text-xs bg-white">
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
        </div>
        <div className=" flex-1">
          <Select onValueChange={(value) => setTopic(value)}>
            <SelectTrigger className="md:text-sm w-full text-xs bg-white">
              <SelectValue  placeholder="Select a Topic..." />
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
        </div>
        <div className="flex-1">
          <Select onValueChange={(value) => setLevel(value)}>
            <SelectTrigger className="md:text-sm w-full text-xs bg-white">
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
        </div>
        <div className="  flex-1">
          <Select onValueChange={(value) => setSort(value)}>
            <SelectTrigger className="md:text-sm w-full text-xs bg-white">
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

export default FilterHeader;
