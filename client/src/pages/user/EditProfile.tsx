import ProfileNavbar from '@/Components/Header/ProfileNavbar'
import Header from '../../Components/Header/Header'
import { useNavigate } from 'react-router-dom'
import React, { FormEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { User } from '@/@types/userType';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import Footer from '@/Components/Footer/Footer';
import { MoveLeftIcon } from 'lucide-react';
import { editUser } from '@/Api/user';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';

const EditProfile:React.FC = () => {
  const user = useSelector((state:User)=>state)
  const [name,setName] = useState(user.name)
  const [email,setEmail] = useState(user.email)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useEffect(()=>{

  // },[user])

  const handleUpdate = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    if(/^[A-Za-z0-9.%+-]+@gmail\.com$/.test(email)){

      try {
      const response = await editUser({name,email,userId:user.id})
      if(response.success){
        console.log("fr",response.user)
         toast.success("Profile updated Successfully")
         dispatch(setUser(response.user))
         return navigate("/profile")
      }else{
        return toast.error(response.response.data.message)
      }
      } catch (error) {
        return toast.error(`${error}`)
      }
    
    }else{
      return toast.error("Invalid Email Structer")
    }
   
  }
  return (
    <div className='bg-blue-50'>
      <Header/>
      <ProfileNavbar/>
      <main className=" w-1/2 mx-auto px-6 py-8"> 
        <Card>
          <div className='ml-6 mt-4'>
          <Button onClick={()=>navigate("/profile")} className='bg-[#49BBBD]' type="button"><MoveLeftIcon/></Button>
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
      </main>
      <Footer />
    </div>
  )
}

export default EditProfile
