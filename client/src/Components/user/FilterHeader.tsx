import { Button } from "../ui/button";
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
import { useEffect, useState } from "react";
import { getCategoryies } from "@/Api/instructor";
import { ICategory } from "@/@types/categoryTpe";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getCourses } from "@/Api/user";
import { ICourse } from "@/@types/courseType";
interface Props {
  categories: ICategory[];
  onsendcourse: (courses: ICourse[]) => void;
}
const FilterHeader: React.FC<Props> = ({ categories, onsendcourse }) => {
  const [topics, setTopics] = useState<string[]>([]);

  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const courses = async () => {
      const data = await getCourses(category,topic,level,search,sort);
    
      if (data.success) {
        console.log(data.courses, "cour");
        onsendcourse(data.courses);
      }
    };
    courses();
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
  }, [categories, category, topic, level, search,search,sort]);

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
      className="h-1/3  flex flex-wrap items-center justify-center gap-4 p-4 "
    >
      <div className="w-75 md:w-1/2 flex bg-white border rounded">
        <input
          type="text"
          className="m-1"
          placeholder="Search courses here..."
          aria-label="Search courses"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="button" className="bg-[#49BBBD] text-white m-1">
          Search
        </Button>
      </div>
      <div className="w-3/4 md:w-1/2  grid auto-rows-min gap-4 md:grid-cols-4">
        <Select
          onValueChange={(value) => {
            setCategory(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
                 <SelectItem value={"All"}>
                    All
                  </SelectItem>
              {categories.map((value: ICategory) => (
                
                <SelectItem key={value._id} value={value.title}>
                  {value.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => setTopic(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Topic</SelectLabel>
              {topics.length > 0 ? (
                <>
                 <SelectItem value={"All"}>
                    All
                  </SelectItem>
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
          <SelectTrigger>
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
          <SelectTrigger>
            <SelectValue placeholder="Sort " />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort</SelectLabel>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Price Low to High">Price Low to High</SelectItem>
              <SelectItem value="Price High to Low">Price High to Low</SelectItem>
              <SelectItem value="Old">Old</SelectItem>
              <SelectItem value="New">New</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterHeader;
