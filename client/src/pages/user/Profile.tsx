import ProfileNavbar from '@/Components/Header/ProfileNavbar'
import Header from '../../Components/Header/Header'
import { useNavigate } from 'react-router-dom'
import React from 'react';
import { useSelector } from 'react-redux';
import { User } from '@/@types/userType';
import { Card } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import Footer from '@/Components/Footer/Footer';


const Profile:React.FC = () => {
  const email = useSelector((state:User)=>state.email)
  const name = useSelector((state:User)=>state.name)
  const navigate = useNavigate();
  const handleProfile = async () =>{
    navigate("/editUser")
  }
  return (
    <div className='bg-blue-50'>
    <Header/>
    <ProfileNavbar/>
    <main className="w-1/2 mx-auto px-6 py-8"> 
      <Card className=" mt-8 p-8 d-flex items-center justify-center ">
     
          <div  className="w-full space-y-4">
              <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200">
                <img src="https://github.com/shadcn.png" alt="" />
              </div>
          </div>
          <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-semibold w-24">Name:</span>
                <span>{name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold w-24">Email:</span>
                <span>{email}</span>
              </div>
            <div className='d-flex items-center justify-center'>
            <Button
              variant="outline"
              onClick={handleProfile}
              className="mt-6 bg-teal-500 text-white hover:bg-teal-600"
            >
              Edit
            </Button>
            </div>
          </div>
    
      </Card>
    </main>
    <Footer />
  </div>
  )
}

export default Profile
