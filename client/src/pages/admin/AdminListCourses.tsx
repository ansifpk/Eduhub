import AdminAside from '@/Components/admin/AdminAside'
import { Card, CardContent, CardDescription } from '@/Components/ui/card';
import { useEffect, useState } from 'react';
import { getCourses, students } from '@/Api/admin';
import toast from 'react-hot-toast';
import { Table, TableBody,
  
  TableCell,
  TableHead,
  TableHeader,
  TableRow, } from '@/Components/ui/table';
import { Button } from '@/Components/ui/button';
import { Badge } from '@/Components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';

interface ICourse{
    _id:string,
    instructorId?:string,
    title:string,
    subCategory:string,
    description:string,
    thumbnail:string,
    category:string,
    level:string,
    price:number,
    test?:[];
    subscription:boolean,
    videos:string[],
    image:string,
    imageUrl?:string,
    isListed?:boolean,
    createdAt:string,
}
const AdminListCourses = () => {
    const [courses,setStudents] = useState([])
    useEffect(()=>{
      const fetchAllStudents = async () => {
          const response = await getCourses();
          console.log(response);
          
          setStudents(response); 
      }
      fetchAllStudents()
    },[]);
    
  return (
    <div className="container-fluid ">
    <div className="row">
        <AdminAside/>
        <div className="col-md-10">   
            <div className="welcome mt-4 mb-4 bg-purple-600">
                <h1>Welcome back, Admin</h1>
                <img src="https://via.placeholder.com/50" alt="Profile Picture" className="profile-pic" />
            </div>
            <div className="grid grid-cols-1">
            <div className='d-flex justify-content-between'>
                   <h1 className="text-lg font-bold">Courses</h1>
                   {/* <Button className='mb-3' onClick={()=>navigate("/admin/addCategory")} >Add Categories</Button> */}
                </div>
                {courses.length>0?(
 <Card>
 <Table>
 <TableHeader>
   <TableRow>
     {/* <TableHead className="w-[100px]">Image</TableHead> */}
     <TableHead>Title</TableHead>
     <TableHead>Thumbnail</TableHead>
     <TableHead>status</TableHead>
     {/* <TableHead>Actions</TableHead> */}
   </TableRow>
 </TableHeader>
 <TableBody>
   {courses.length>0? (
     courses.map((value:ICourse,index)=>(
       <TableRow key={index}>
         {/* <TableCell className="font-medium"> <img src={value.imageUrl} alt="Profile Picture" className="profile-pic" /></TableCell> */}
         <TableCell>{value.title}</TableCell>
         <TableCell>{value.thumbnail}</TableCell>
         <TableCell>{value.isListed?<><Badge className="bg-green-500">Listed</Badge></>:<><Badge className="bg-danger">UnListed</Badge></>}</TableCell>
         <TableCell>
         <DropdownMenu>
      {/* <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          
          className="flex h-8 w-15 p-0  border-solid-red"
        >
         Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[160px]">
        <DropdownMenuItem onClick={()=>navigate(`/instructor/editCourse/${value._id}`)} >Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={()=>handleListCourse(value._id)}>{value.isListed?"UnList":"List"}</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
      </DropdownMenuContent> */}
    </DropdownMenu>
         </TableCell>
       </TableRow>
     ))
   ):(
  <></>
   )}
 </TableBody>
</Table>
</Card> 
             ):(
              <div className='d-flex justify-center'>
                <Card className='w-1/2 d-flex justify-center '>
                  <CardContent className='d-flex m-5 items-center'>
                    <CardDescription>
                       no courses uploaded yet<br/><br/>
                       {/* <Button onClick={()=>navigate("/instructor/createCourse")}>Upload a Course</Button> */}
                    </CardDescription>
                  </CardContent>
              </Card>
              </div>
             )}
           
          </div>
        </div>
    </div>
</div>
  )
}

export default AdminListCourses
