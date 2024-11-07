import React, { useEffect, useState } from 'react';
import std from '../../assets/home-page/teacher-home.jpg'

import toast from 'react-hot-toast';
import { CardDescription, CardHeader} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import {  useNavigate } from 'react-router-dom';
import InstructorAuthHead from '@/Components/instructor/instructorAuthHead';
import { Button } from '@/Components/ui/button';
import { currentUser, register } from '@/Api/instructor';
import { setInstructor } from '@/redux/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { User } from '@/@types/userType';
const InstructorRegister = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState("");
  const [qualification, setQualification] = useState('');
  const [user, setUser] = useState();
  const [expirience, setExpirience] = useState('');
  const [certificat, setCertificate] = useState('');
  const [cv, setCv] = useState('');
  const [optionError, setoptionError] = useState(false);
  const [next, setNext] = useState(false);
  const [page,setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = useSelector((state:User)=>state.id)
  const userName = useSelector((state:User)=>state.name)
  const userEmail = useSelector((state:User)=>state.email)

  console.log(email.length,next);

  useEffect( () =>{
    if(userId){
      setName(userName)
      setEmail(userEmail)
    }
    if(email.length >0 && name.length >0){
      setNext(true)
   }
  },[name,email,password])
   

  const handleSubmit  = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()    
       if(certificat.length == 0){
        toast.error("Please select an option")
        setoptionError(true)
       }
       console.log(name,email,
        "qual",qualification,
        "expirience",expirience,
        "certi ex",certificat,
        "cv",cv
       );
       const response = await register({name,email,qualification,expirience,certificat,cv})
       if(response.success){
         console.log(response.user.user);
         dispatch(setInstructor(response.user.user))
         toast.success("Register Successfull")
         return navigate("/instructor")
       }else{
        toast.error(response.response.data.message)
       }
      //  navigate("/instructor/")
  }
  return (
    <div>
     <div className='row pt-5'>
         <div className='col-6 mx-4 '>
          <CardHeader>
              <CardDescription  className='text-center'>
              <img  style={{borderRadius:'25px'}} src={std} alt="" />
              </CardDescription>
          </CardHeader>
            
         </div>
         <div className='col-5 p-2 rounded-5 border-1 border-[#49BBBD] '>
        <InstructorAuthHead />
        <div>
        <form  onSubmit={handleSubmit}>
             <div className="space-y-4">
               {page==1?(
                <>
                <div className="space-y-2 flex flex-col items-center">
                      <label className="w-1/2 text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value.trim())}
                        className="w-1/2 rounded-full p-2 border-1 border-blue-900"
                        
                      />
                    </div>
                    <div className="space-y-2 flex flex-col items-center">
                      <label className="w-1/2 text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <Input
                        id="name"
                        type="string"
                        placeholder="Enter your Name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value.trim())}
                        className="w-1/2 rounded-full p-2 border-1 border-blue-900"
                        
                      />
                    </div>
                    {/* <div className="space-y-2 flex flex-col items-center">
                      <label className="w-1/2 text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value.trim())}
                        className="w-1/2 rounded-full p-2 border-1 border-blue-900"
                        
                      />
                    </div> */}
                </>
               ):(
                <>
               <div className="space-y-2 flex flex-col items-center">
                      <label className="w-1/2 text-sm font-medium text-gray-700">
                        Qualification
                      </label>
                      <Input
                        id="Qualification"
                        type="string"
                        placeholder="Enter your qualification"
                        value={qualification}
                        required
                        onChange={(e) => setQualification(e.target.value.trim())}
                        className="w-1/2 rounded-full p-2 border-1 border-blue-900"
                      
                      />
                      {optionError&&<p className='text-danger'>PLease selcet an option</p>}
                    </div>
                    <div className="space-y-2 flex flex-col items-center">
                      <label className="w-1/2 text-sm font-medium text-gray-700">
                        What kind of teaching have you done before?
                      </label>
                       <Select  onValueChange={(value) => setExpirience(value)}>
                          <SelectTrigger  className="w-1/2 rounded-full border-1 border-blue-900">
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
                       {optionError&&<p className='text-danger'>PLease selcet an option</p>}
                    </div>
                    <div className="space-y-2 flex flex-col items-center">
                      <label className="w-1/2 text-sm font-medium text-gray-700">
                        Attach the expirience certificate
                      </label>
                      <Input
                        id="password"
                        type="file"
                        placeholder="choose file"
                        value={certificat}
                        required
                        onChange={(e) => setCertificate(e.target.value)}
                        className="w-1/2 rounded-full p-2 border-1 border-blue-900"
                        
                      />
                    </div>
                    <div className="space-y-2 flex flex-col items-center">
                      <label className="w-1/2 text-sm font-medium text-gray-700">
                        Attach your cv
                      </label>
                      <Input
                        id="password"
                        type="file"
                        placeholder="choose file"
                        value={cv}
                        required
                        onChange={(e) => setCv(e.target.value)}
                        className="w-1/2 rounded-full p-2 border-1 border-blue-900"
                        
                      />
                    </div>
                  </>
               )}
               <div className="flex justify-evenly">
                <div>
                   <h6>{page}/2</h6>
                </div>
               <div>
                  {page==1?(
                      <Button 
                        onClick={()=>setPage(2)}
                        disabled={!next}
                        className="bg-[#5BBFB5] text-white px-4 py-2   rounded-full  transition-colors"
                      >
                        Next
                    </Button>
                  ):(
                    <div>
                      <button
                        onClick={()=>setPage(1)}
                        className="bg-[#5BBFB5] text-white px-4 py-2  rounded-full hover:bg-[#4ca99f] transition-colors"
                      >
                        Prev
                    </button>
                      <button 
                        type="submit"
                        className="bg-[#5BBFB5] text-white px-4 py-2  rounded-full hover:bg-[#4ca99f] transition-colors"
                      >
                        Register
                    </button>
                    </div>
                  )}
                 
               </div>
              </div>
               <div className="text-center">
               <p onClick={()=>navigate("/login")} className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer">
                    Back to Login
                </p>
               </div>
             </div>
           </form>
        </div>
         </div>
      </div>
    </div>
  );
};

export default InstructorRegister;