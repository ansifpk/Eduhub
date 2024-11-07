import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import './InstructorHome.css';
import InstructorAside from '../../Components/instructor/InstructorAside'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import React, { useEffect, useState } from 'react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { MoveLeftIcon } from 'lucide-react';
import { editProfile } from '@/Api/instructor';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';

  interface User{
    id:string;
    name:string;
    email:string;
    isAdmin:boolean;
    isInstructor:boolean;
    isBlock:boolean;
  }
 
  
const InstructorEditProfile = () => {
    
    const nameUser = useSelector((state:User)=>state.name);
    const idUser = useSelector((state:User)=>state.id);
    const nameEmail = useSelector((state:User)=>state.email);
    const [name,setName] = useState(nameUser);
    const [email,setEmail] = useState(nameEmail);
   
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleUpdate = async(e:React.FormEvent<HTMLFormElement>) => {
           e.preventDefault();
           const response = await editProfile({name,email,instructorId:idUser})
           if(response.success){
            dispatch(setUser(response.user))
            toast.success("Profile Updated Successfully")
            return navigate(-1)
           }else{
           return  toast.error(response.response.data.message)
           }
          }
  return (
    <div className="container-fluid">
    <div className="row">
        <InstructorAside/>
        <div className="col-md-10">
                  
            <div className="welcome mt-4 mb-4">
                <h1>Welcome back, {name}</h1>
                <img src="https://github.com/shadcn.png" alt="Profile Picture" onClick={()=>navigate("/instructor/profile")} className="profile-pic" />
            </div>

           <div className='d-flex items-center justify-center'>
           <div className="w-1/2 ">
       <Card>
          <div className='ml-6 mt-4'>
          <Button onClick={()=>navigate(-1)} className='bg-[#49BBBD]' type="button"><MoveLeftIcon/></Button>
          </div>
          <div  className="p-8 flex flex-col items-center justify-center">
        <form onSubmit={handleUpdate}>
            <div  className="w-full space-y-4">
              <div className='text-center' >
                <h5>Edit Your Profile</h5>
              </div>
              <div >
                <Label>Email</Label>
                <Input className=" rounded-full" type="email" value={email}  onChange={(e)=>setEmail(e.target.value.trim())} required />
              </div>
              <div >
                <Label>Name</Label>
                <Input className=" rounded-full" type="text" value={name} onChange={(e)=>setName(e.target.value.trim())} required />
              </div>
              <div className="d-flex justify-center gap-10" >
               
                <Button className='rounded-full bg-[#49BBBD]' type="submit" >Edit</Button>
              </div>
            </div>
          </form>
          </div>
        </Card>
     </div>
           </div>
           
        </div>
    </div>
</div>
  )
}

export default InstructorEditProfile
