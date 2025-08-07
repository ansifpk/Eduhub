import ProfileNavbar from "../../components/Header/ProfileNavbar";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import React, {  useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../../@types/userType";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Footer from "../../components/Footer/Footer";
import { changeProfileImage } from "../../Api/user";
import toast from "react-hot-toast";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import ChangeEmail from "../../components/user/ChangeEmail";
import useRequest from "../../hooks/useRequest";
import userRoutes from "../../service/endPoints/userEndPoints";

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [changeEmail, setChangeEmail] = useState(false);
  const [aboutMe, setAboutMe] = useState('');
  const [image, setImage] = useState({
    id: "" as string,
    avatar_url: "" as string | File,
  });
  const navigate = useNavigate();
  const userId = useSelector((state: User) => state.id);
const { doRequest, errors } = useRequest();

  useEffect(() => {
    doRequest({
      url:`${userRoutes.profile}?userId=${userId}`,
      method:"get",
      body:{},
      onSuccess:(response)=>{
        setName(response.userData.name);
        setEmail(response.userData.email);
        setAboutMe(response.userData.about);
        setImage({
          id:response.userData.avatar.id,
          avatar_url:response.userData.avatar.avatar_url,
        })
      }
    })

  }, [userId]);

  
  const changeImage = async (file: File) => {
    const formData = new FormData()
    formData.append('profileImage',file)
    const response = await changeProfileImage(userId,formData)
    if(response.success){
      setFileToBase(file)
      return toast.success("Successfully updated your profile...")
    }else{
      return toast.error(response.response.data.message)
    }
  };
  
  
    const setFileToBase = async (file: File): Promise<void> => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImage((prev)=>({
            ...prev,
            avatar_url: reader.result as string
          }));
        }
      };
    };
    
    useEffect(()=>{
      errors?.map((err)=>toast.error(err.message))
    },[errors]);

 
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef!.current!.click();
  };


 if (changeEmail) {
    return <ChangeEmail />;
  }

  return (
    <div className="bg-blue-50 w-full h-screen ">
      <Header />
      <ProfileNavbar />
      <main className="w-full md:p-8 p-2">
        
          <Card  >
            <div className="flex">
              <div className="w-50"> 
                <div className="m-3 md:w-48 md:h-48 w-24 h-24  rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={image.avatar_url as string?image.avatar_url as string:"https://github.com/shadcn.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center gap-2">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        if (e.target.files[0]) {
                          const val = e.target.files[0];
                          changeImage(val);
                        }
                      }
                    }}
                    className="hidden"
                />

                  <div className="cursor-pointer rounded-lg bg-teal-500 text-center text-white md:text-sm text-xs md:px-3 px-2 py-1 rounded-2 " onClick={handleButtonClick}>change profile</div>
                  <div onClick={()=>setChangeEmail(true)} className="cursor-pointer rounded-lg text-center bg-teal-500 text-white md:text-sm text-xs md:px-3 px-2 py-1 rounded-2 ">change email</div>
                </div>
            </div>
            <div className=" w-full md:p-3 p-1 space-y-2">
             <div className="flex md:gap-5 gap-0.5 ">
                <div >
                    <Label>Name</Label>
                    <Input className="shadow-lg md:w-full text-xs w-70 " readOnly value={name} />
                  </div>
                  <div >
                    <Label>Email</Label>
                    <Input className="shadow-lg md:w-full text-xs w-70" readOnly value={email} />
                  </div>
             </div>
             <div>
               <Label>About Me</Label>
               <Textarea className="h-[150px] shadow-lg md:text-sm text-xs" readOnly value={aboutMe} />
             </div>
             <Button onClick={()=>navigate("/editUser")} className="m-2 text-xs bg-teal-500 hover:bg-teal-500 ">Edit</Button>
            </div>
            </div>
          </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
