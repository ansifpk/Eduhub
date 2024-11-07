import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import './InstructorHome.css';
import InstructorAside from '../../Components/instructor/InstructorAside'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import React, { useState } from 'react';
import { students } from '@/Api/admin';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import toast from 'react-hot-toast';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import CourseCreatePage from '@/Components/instructor/courseCreatePage';

  interface IUser{
    _id:string;
    name:string;
    email:string;
    isAdmin:boolean;
    isInstructor:boolean;
    isBlock:boolean;
  }

const InstructorCreateCourses = () => {
    const [courses,setCourses] = useState([]);
    const [title,setTitle] = useState("");
    const [error,setError] = useState(false);
    let [page,setPage] = useState(1);
    const [category,setCategory] = useState("");
    const name = useSelector((state:IUser)=>state.name);
   
    const navigate = useNavigate();
    const validateCategory = (category:string) => {
     return category.length > 0;
    }
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
           e.preventDefault();
           setPage(page+1)
           toast.success(`userid${page}`);

    }
   
  if(title.length>1&&category.length>1&&page==3){
     return(
        <CourseCreatePage />
     )
  }

  return (
    <div className="container-fluid bg-blue-200">
    <div className="row">
        <InstructorAside/>
        <div className="col-md-10">
            <div className="welcome mt-4 mb-4">
                <h1>Welcome back, {name}</h1>
                <img src="https://github.com/shadcn.png" alt="Profile Picture" onClick={()=>navigate("/instructor/profile")} className="profile-pic" />
            </div>

           
            <div className="flex  items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader >
          <CardTitle>Add a title</CardTitle>
        </CardHeader>
        <CardContent>
        <form onSubmit={handleSubmit}>
             <div className="space-y-4">
             {page===1?(<>
              <div className="space-y-2">
                 <Input
                   type="string"
                   placeholder="Enter your Title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   className="w-full"
                   required
                 />
              </div>

               {error && (
                 <Alert variant="destructive">
                   <AlertCircle className="h-4 w-4" />
                   <AlertDescription>{error}</AlertDescription>
                 </Alert>
               )}

               <div className='flex justify-end gap-2'>
               <Button
                 type="submit"
               >
                 next
               </Button>
              </div>
              </>):page===2?(<>
                     <div className="space-y-2">
                        <Select  onValueChange={(value) => setCategory(value)}>
                          <SelectTrigger  className="w-100 rounded-full border-1 border-blue-900">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent >
                            <SelectGroup>
                              <SelectItem value="In person, Informally">In person, Informally</SelectItem>
                              <SelectItem value="In person, Profesionally">In person, Profesionally</SelectItem>
                              <SelectItem value="Online">Online</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                     </div>

               {error && (
                 <Alert variant="destructive">
                   <AlertCircle className="h-4 w-4" />
                   <AlertDescription>{error}</AlertDescription>
                 </Alert>
               )}

               <div className='flex justify-end gap-2'>
               
               <button
                 onClick={()=>setPage(page-1)}
                 className="bg-blue-500 text-white px-4 py-1  rounded-1 "
                >
                  Prev
                </button>
  
               <Button
                 type="submit"
                 disabled={!validateCategory(category)}
               >
                 next
               </Button>
              </div>
              </>):(<>

              </>)}
               <div className="text-center">
                 <p
                   onClick={()=>navigate(-1)}
                   className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
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
  )
}

export default InstructorCreateCourses
