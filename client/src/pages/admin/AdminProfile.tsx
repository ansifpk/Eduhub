import {Card, CardContent, CardHeader  } from '../../Components/ui/card';
import AdminAside from '../../Components/admin/AdminAside';
import { Avatar, AvatarImage } from '@/Components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import { useSelector } from 'react-redux';
import { useState } from 'react';
interface Admin{
  id:string;
  name:string;
  email:string
}
const AdminProfile = () => {
    const adminName = useSelector((state:Admin)=>state.name) 
    const adminEmail = useSelector((state:Admin)=>state.email) 
    const navigate = useNavigate();
      
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

            <div className='flex items-center justify-center'>
            <div className='w-1/2' >
            {/* Courses Section */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold text-center">Admin Profile</h2>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
              <div className="space-y-2">
                    <div >
                        <span className="font-semibold w-24">Name:</span>  <span>{adminName}</span>
                        
                    </div>
                    <div >
                        <span className="font-semibold w-24">Email:</span>  <span>{adminEmail}</span>
                       
                    </div>
            <div className='d-flex items-center justify-center'>
            <Button
            
              onClick={()=>navigate("/admin/editProfile")}
              className="mt-6  text-white bg-purple-600"
            >
              Edit
            </Button>
            </div>
          </div>
              </CardContent>
            </Card>
           
          </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default AdminProfile
