import {Card, CardContent, CardHeader  } from '../../Components/ui/card';
import AdminAside from '../../Components/admin/AdminAside';
import { Avatar, AvatarImage } from '@/Components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { MoveLeftIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { editProfile } from '@/Api/admin';
import toast from 'react-hot-toast';
import { setAdmin } from '@/redux/authSlice';
interface Admin{
    id:string;
    name:string;
    email:string
}
const AdminEditProfile = () => {
    const adminId = useSelector((state:Admin)=>state.id) 
    const adminName = useSelector((state:Admin)=>state.name) 
    const adminEmail = useSelector((state:Admin)=>state.email) 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name,setName] = useState(adminName)
    const [email,setEmail] = useState(adminEmail)
  const handleEdit = async (e:FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     const response = await editProfile({email,name,adminId})
     if(response.success){
       toast.success("Profile Updated Successfully")
       dispatch(setAdmin(response.admin))
       return navigate("/admin/profile")
     }else{
      return toast.error(response.response.data.message)
     }
     
  }
      
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
                <h2 className="text-lg font-semibold text-center">Edit Admin Profile</h2>
              </CardHeader>
              <CardContent>
              <div>
                <Button onClick={()=>navigate(-1)} className='bg-purple-600' type="button"><MoveLeftIcon/></Button>
                </div>
              <form className="space-y-2" onSubmit={handleEdit}>
                    <div className="flex-col w-1/2 mx-auto items-center justify-center">
                        <Label className="font-semibold w-24">Name:</Label>
                        <Input value={name} required onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="flex-col w-1/2 mx-auto items-center justify-center">
                        <Label className="font-semibold w-24">Email:</Label>
                        <Input onChange={(e)=>setEmail(e.target.value)} required value={email}/>
                    </div>
            <div className='d-flex items-center justify-center'>
            <Button
              type='submit'
              className="mt-6 bg-teal-500 text-white  bg-purple-600"
            >
              Edit
            </Button>
            </div>
          </form>
              </CardContent>
            </Card>
          </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default AdminEditProfile
