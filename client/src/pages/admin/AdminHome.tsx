import {Card, CardContent, CardHeader  } from '../../Components/ui/card';
import AdminAside from '../../Components/admin/AdminAside';
import { Avatar, AvatarImage } from '@/Components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ICourse } from '@/@types/courseType';
import {  top5Courses, top5Instructors, top5RatedCourse } from '@/Api/admin';
import { IUser } from '@/@types/chatUser';
import AdminChart from '@/Components/admin/AdminChart';


  
const AdminHome = () => {
  
   const [users,setUsers] = useState<IUser[]>([]);
   const [courses,setCourses] = useState<ICourse[]>([]);
   const [topCourses,setTopCourses] = useState<ICourse[]>([]);
   
   
       const navigate = useNavigate()
       useEffect(()=>{
         const fetching = async() => {
            const response = await top5Courses() ;
            
            if(response){
             setCourses(response)
            }
            const respo = await top5Instructors()
            if(respo){
              setUsers(respo)
            }
            const res = await top5RatedCourse()
            if(res){
              setTopCourses(res)
            }
         }
         fetching()
       },[])
       
  return (
    <div className="container-fluid ">
    <div className="row">
        <AdminAside/>
        <div className="col-md-10">
            <div className="welcome mt-4 mb-4 bg-purple-600">
                <h1>Welcome back, Admin </h1>
                <Avatar>
                     <AvatarImage onClick={()=>navigate("/admin/profile")} className='avatar' src="https://github.com/shadcn.png" />
                </Avatar>
            </div>
            <div className="grid grid-cols-2 w-full  gap-x-96 gap-y-4">
             <div className="w-[650px]">
                <AdminChart />
             </div>
             <div className=" text-white w-[250px]">
              <Card className='h-full'>
                <CardHeader>
                  <h2 className="text-lg font-semibold">TOP 5 COURSES</h2>
                </CardHeader>
                <CardContent>
                  {
                  courses.length>0?(
                    courses.map((course, index) => (
                      <div key={index} className="mb-4 last:mb-0 flex justify-between" >
                      <div >
                        <div className="font-medium text-sm">{course.title}</div>
                        <div className="text-xs text-gray-500">students : {course.students?.length}</div>
                      </div>
                      <div  className="font-medium text-xs">
                        Price {course.price}
                      </div>
                    </div>
                  ))
                  ):(
                    <p>No Courses Available</p>
                  )
                  }
                </CardContent>
              </Card>
             </div>
             <div className="grid grid-cols-2 gap-x-80">
              <div className="w-[300px] h-[410px]">
                  <Card className='h-full'>
                  <CardHeader>
                    <h2 className="text-lg font-semibold">TOP RATED 5 INSTRUCTORS</h2>
                  </CardHeader>
                  <CardContent>
                    {
                      users.length>0?(
                        users.map((review, index) => (
                          <div key={index} className="flex items-center gap-3 mb-4 last:mb-0">
                            <img 
                              src={review.avatar.avatar_url?review.avatar.avatar_url:"https://via.placeholder.com/50"} 
                              className="w-8 h-8 rounded-full"
                            />
                            <div className='flex justify-between items-center w-full' >
                              <div>
                                <div className="font-medium">{review.name}</div>
                                <div className="text-sm text-gray-500">{review.email}</div>
                              </div>
                              <div className="font-medium text-sm text-gray-500"> Ratings : {review.instructorReviews?.length} </div>
                            </div>
                          </div>
                        ))
                      ):(
                      <p>No Instructors Available</p>
                      )
                    
                    }
                  </CardContent>
                </Card>
              </div>
              <div className="w-[300px] h-[410px]">
              <Card className='h-full'>
              <CardHeader>
                <h2 className="text-lg font-semibold">TOP RATED 5 COURSES</h2>
              </CardHeader>
              <CardContent>
                {
                topCourses.length>0?(
                  topCourses.map((course, index) => (
                    <div key={index} className="mb-4 last:mb-0 flex justify-between" >
                     <div >
                      <div className="font-medium text-sm">{course.title}</div>
                      <div className="text-xs text-gray-500">Reviews : {course.courseReviews?.length}</div>
                     </div>
                     <div  className="font-medium text-xs">
                       Price {course.price}
                     </div>
                   </div>
                 ))
                ):(
                  <p>No Courses Available</p>
                )
                }
              </CardContent>
            </Card>
            </div>
          </div>
          </div>
            {/* <div className='flex gap-3 justify-center' >
            <div className="w-[300px] h-[410px]">
            <Card className='h-full'>
              <CardHeader>
                <h2 className="text-lg font-semibold">TOP 5 COURSES</h2>
              </CardHeader>
              <CardContent>
                {
                courses.length>0?(
                  courses.map((course, index) => (
                    <div key={index} className="mb-4 last:mb-0 flex justify-between" >
                     <div >
                      <div className="font-medium text-sm">{course.title}</div>
                      <div className="text-xs text-gray-500">students : {course.students?.length}</div>
                     </div>
                     <div  className="font-medium text-xs">
                       Price {course.price}
                     </div>
                   </div>
                 ))
                ):(
                  <p>No Courses Available</p>
                )
                }
              </CardContent>
            </Card>
            </div>
            <div className="w-[300px] h-[410px]">
            <Card className='h-full'>
              <CardHeader>
                <h2 className="text-lg font-semibold">TOP RATED 5 INSTRUCTORS</h2>
              </CardHeader>
              <CardContent>
                {
                  users.length>0?(
                    users.map((review, index) => (
                      <div key={index} className="flex items-center gap-3 mb-4 last:mb-0">
                        <img 
                          src={review.avatar.avatar_url?review.avatar.avatar_url:"https://via.placeholder.com/50"} 
                          className="w-8 h-8 rounded-full"
                        />
                        <div className='flex justify-between items-center w-full' >
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <div className="text-sm text-gray-500">{review.email}</div>
                          </div>
                           <div className="font-medium text-sm text-gray-500">Ratings : {review.instructorReviews?.length}</div>
                        </div>
                      </div>
                    ))
                  ):(
                  <p>No Instructors Available</p>
                  )
                
                }
              </CardContent>
            </Card>
            </div>
            <div className="w-[300px] h-[410px]">
            <Card className='h-full'>
              <CardHeader>
                <h2 className="text-lg font-semibold">TOP RATED 5 COURSES</h2>
              </CardHeader>
              <CardContent>
                {
                topCourses.length>0?(
                  topCourses.map((course, index) => (
                    <div key={index} className="mb-4 last:mb-0 flex justify-between" >
                     <div >
                      <div className="font-medium text-sm">{course.title}</div>
                      <div className="text-xs text-gray-500">Reviews : {course.courseReviews?.length}</div>
                     </div>
                     <div  className="font-medium text-xs">
                       Price {course.price}
                     </div>
                   </div>
                 ))
                ):(
                  <p>No Courses Available</p>
                )
                }
              </CardContent>
            </Card>
            </div>
            </div> */}
        </div>
    </div>
</div>
  )
}

export default AdminHome
