import { Card, CardContent, CardDescription, CardHeader } from '@/Components/ui/card';
import './InstructorHome.css';
import InstructorAside from '../../Components/instructor/InstructorAside'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/Components/ui/table';
import { useState } from 'react';
import { students } from '@/Api/admin';

  interface IUser{
    _id:string;
    name:string;
    email:string;
    isAdmin:boolean;
    isInstructor:boolean;
    isBlock:boolean;
  }

const InstructorListCourses = () => {
    const [courses,setCourses] = useState([]);
    const name = useSelector((state:IUser)=>state.name);
   
    const navigate = useNavigate()
    const handleBlockStudents = (userId:string) => {
           console.log("userid",userId)
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

           
            <div className=" grid grid-cols-1 gap-8">
            <h1 className="text-lg font-bold">Your Courses</h1>
            {/* <Card className='relaticve d-flex justify-content-center gap-20  bg-cover bg-center overflow-hidden'  style={{ backgroundImage: "url('https://github.com/shadcn.png')"}}> */}
             {students.length>0?(
 <Card>
 <Table>
 <TableHeader>
   <TableRow>
     <TableHead className="w-[100px] ">Image</TableHead>
     <TableHead>Name</TableHead>
     <TableHead>Email</TableHead>
     <TableHead className="text-right">Actions</TableHead>
   </TableRow>
 </TableHeader>
 <TableBody>
   {courses.length>0? (
     courses.map((value:IUser,index)=>(
       <TableRow key={index}>
         <TableCell className="font-medium"> <img src="https://via.placeholder.com/50" alt="Profile Picture" className="profile-pic" /></TableCell>
         <TableCell>{value.name}</TableCell>
         <TableCell>{value.email}</TableCell>
         <TableCell className="text-right"><button onClick={()=>handleBlockStudents(value._id!)} className={value.isBlock?'btn btn-danger':'btn btn-success'}>{value.isBlock ? "UnBlock":"BLock"}</button></TableCell>
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
                       <Button onClick={()=>navigate("/instructor/createCourse")}>Upload a Course</Button>
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

export default InstructorListCourses
