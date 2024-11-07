import { Card, CardContent, CardHeader } from '@/Components/ui/card';
import './InstructorHome.css';
import InstructorAside from '../../Components/instructor/InstructorAside'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import { useState } from 'react';

  interface User{
    id:string;
    name:string;
    email:string;
    isAdmin:boolean;
    isInstructor:boolean;
    isBlock:boolean;
  }
 
  
const InstructorProfile = () => {
    
  const nameUser = useSelector((state:User)=>state.name);
  const nameEmail = useSelector((state:User)=>state.email);
  const [name,setName] = useState(nameUser);
  const [email,setEmail] = useState(nameEmail);
    const navigate = useNavigate();

  return (
    <div className="container-fluid">
    <div className="row">
        <InstructorAside/>
        <div className="col-md-10">
                  
            <div className="welcome mt-4 mb-4">
                <h1>Welcome back, {name}</h1>
                <img src="https://github.com/shadcn.png" alt="Profile Picture" onClick={()=>navigate("/instructor/profile")} className="profile-pic" />
            </div>

           
            <div className=" grid grid-cols-1 gap-8">
       
            {/* <Card className='relaticve d-flex justify-content-center gap-20  bg-cover bg-center overflow-hidden'  style={{ backgroundImage: "url('https://github.com/shadcn.png')"}}> */}
            <Card className='d-flex justify-content-center gap-20 '>
              <Card className='relaticve d-flex justify-content-center gap-10  bg-cover bg-center overflow-hidden my-3 '  style={{ backgroundImage: "url('https://github.com/shadcn.png')",}}>
                <CardHeader  >
                    <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200">
                      <img src="https://github.com/shadcn.png" alt="" />
                    </div>
                </CardHeader>
                <CardContent className='bg-opacity-87 bg-blue-100 rounded-[20px] mr-2 my-3'>
                  {/* <h2 className="text-lg  mt-5 font-semibold">Title:{name}</h2>
                  <h2 className="text-lg font-semibold">about me:{email}</h2> */}
                    <h2 className="text-lg mt-2 font-semibold">Name  :  {name}</h2>
                    <h2 className="text-lg   font-semibold">Email  :  {email}</h2>
                    <Button onClick={()=>navigate("/instructor/editProfile")}>Edit</Button>
                </CardContent>
              </Card>
            </Card>
          </div>
        </div>
    </div>
</div>
  )
}

export default InstructorProfile
