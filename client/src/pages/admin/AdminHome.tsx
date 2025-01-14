import {Card, CardContent, CardHeader  } from '../../Components/ui/card';
import AdminAside from '../../Components/admin/AdminAside';
import { Avatar, AvatarImage } from '@/Components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IOrder } from '@/@types/orderTypes';
import { ICourse } from '@/@types/courseType';
import { getCourses, top5Courses, top5Instructors } from '@/Api/admin';
import { IUser } from '@/@types/chatUser';


  
const AdminHome = () => {
   const [orders,setOrders] = useState<IOrder[]>([]);
   const [users,setUsers] = useState<IUser[]>([]);
   const [courses,setCourses] = useState<ICourse[]>([]);
      
       const navigate = useNavigate()
       useEffect(()=>{
         const fetching = async() => {
           const response = await top5Courses() 
           if(response){
             setCourses(response)
            }
            const respo = await top5Instructors()
            console.log('respo',respo);
         }
         fetching()
       },[])
  return (
    <div className="container-fluid ">
    <div className="row">
        <AdminAside/>
        <div className="col-md-10">
                  
            <div className="welcome mt-4 mb-4 bg-purple-600">
                <h1>Welcome back, Admin</h1>
                <Avatar>
                     <AvatarImage onClick={()=>navigate("/admin/profile")} className='avatar' src="https://github.com/shadcn.png" />
                </Avatar>
            </div>

           
            <div className="grid grid-cols-2 gap-8">
           
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">TOP 5 COURSES</h2>
              </CardHeader>
              <CardContent>
                {courses.map((course, index) => (
                   <div key={index} className="mb-4 last:mb-0 flex justify-between" >
                    <div >
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-gray-500">studnets : {course.students?.length}</div>
                    </div>
                    <div  className="font-medium text-sm">
                      Price {course.price}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Top instructors</h2>
              </CardHeader>
              <CardContent>
                {courses.map((review, index) => (
                  <div key={index} className="flex items-center gap-3 mb-4 last:mb-0">
                    <img 
                      src={review.image.image_url} 
                      
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{review.title}</div>
                      <div className="text-sm text-gray-500">{review.price}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
</div>
  )
}

export default AdminHome
