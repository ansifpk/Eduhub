import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import InstructorAside from "../../components/instructor/InstructorAside";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import { getCategoryies } from "../../Api/instructor";
import { Separator } from "../../components/ui/separator";
import CourseCreatePage from "../../components/instructor/CourseCreatePage";





interface ICategory {
  _id: string;
  title: string;
  decription: string;
  topics: [];
  isListed: boolean;
}

const InstructorCreateCourses = () => {

  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState<string>("");
  const [error] = useState(false);
  let [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getCategoryies();
      if(data){
        setCategories(data);
      }
      
    };
    
    fetchCategory();

  }, []);
  
  const validateCategory = (category: string) => {
    return category.length > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(page + 1);
  };

  if (title.length > 1 && category.length > 1 && page == 3) {
    return (
      <CourseCreatePage  Title={title}
      Category={category}
      categories={categories} />
    );
  }

  return (
    <div className="bg-black ">
      <div className="md:hidden">
        <img
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <img
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-white text-2xl font-bold tracking-tight">
            Edu Hub
          </h2>
          <p className="text-muted-foreground">
            Manage your instructor account students and courses.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <InstructorAside />

          <div className="flex-1 lg:max-w-full ">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-y-2">
                <div>
                  <div className="text-white">
                    <h2 className="text-2xl font-bold tracking-tight">
                      Welcome back!
                    </h2>
                    <p className="text-muted-foreground">
                      Here is the list of courses of your...
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-center">
              <Card className="w-full max-w-md bg-black">
                <CardHeader>
                  <CardTitle className="text-white">Add a title and category</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      {page === 1 ? (
                        <>
                          <div className="space-y-2">
                            <Input
                              type="string"
                              placeholder="Enter your Title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              className="w-full text-white bg-black"
                              required
                            />
                            <div className="text-gray-400">
                             <p>You can change this title later if you want.</p>
                            </div>
                          </div>

                          {error && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>{error}</AlertDescription>
                            </Alert>
                          )}

                          <div className="flex justify-end gap-2">
                            <Button type="submit" className="bg-white hover:bg-white cursor-pointer text-black">next</Button>
                          </div>
                        </>
                      ) : page === 2 ? (
                        <>
                          <div className="space-y-2">
                            <Select
                              onValueChange={(value) => setCategory(value)}
                            >
                              <SelectTrigger className="w-100 rounded-full border-1 border-white text-white">
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {categories.length > 0 ? (
                                    <>
                                      {categories.map(
                                        (value: ICategory, index) => (
                                          <SelectItem
                                            key={index}
                                            value={`${value.title}`}
                                          >
                                            {value.title}
                                          </SelectItem>
                                        )
                                      )}
                                    </>
                                  ) : (
                                    <>no Categoryfount</>
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <div className="text-gray-400">
                             <p>You can change this category later if you want.</p>
                            </div>
                          </div>

                          {error && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>{error}</AlertDescription>
                            </Alert>
                          )}

                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={() => setPage(page - 1)}
                              className="bg-white hover:bg-white cursor-pointer text-black px-4 py-1  rounded-1 "
                            >
                              Prev
                            </Button>

                            <Button
                              type="submit"
                              className="bg-white  text-black"
                              disabled={!validateCategory(category)}
                            >
                              next
                            </Button>
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                      <div className="text-center">
                        <p
                          onClick={() => navigate(-1)}
                          className="text-sm text-white hover:text-white underline cursor-pointer"
                        >
                          Back
                        </p>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCreateCourses;
