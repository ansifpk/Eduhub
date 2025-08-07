import ProfileNavbar from "../../components/Header/ProfileNavbar";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";
import React, {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "../../@types/userType";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { profileUpdated } from "../../redux/authSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Textarea } from "../../components/ui/textarea";
import useRequest from "../../hooks/useRequest";
import userRoutes from "../../service/endPoints/userEndPoints";

const EditProfile: React.FC = () => {
  const user = useSelector((state: User) => state);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("Hi im a Student");
  const [aboutMe, setAboutMe] = useState(
    `Hi everyone, I’m ${name}, a student on EduHub, and I’m thrilled to be here! This platform has been incredibly helpful in my learning journey. The variety of courses available, taught by expert instructors, has allowed me to dive deep into new areas and build valuable skills. What I love most about EduHub is the supportive community of like-minded learners who share the same passion for growth. With flexible learning options and expert guidance, EduHub makes it easy for anyone to improve their skills. I’m excited to continue learning and growing here, and I hope you are too!`
  );
  const {doRequest,errors} = useRequest()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setErrors] = useState({
    userName: false,
    thumbnail: false,
    aboutMe: false,
  });
  useEffect(() => {
    doRequest({
      url:`${userRoutes.profile}?userId=${user.id}`,
      body:{},
      method:"get",
      onSuccess:(response)=>{
        setName(response.userData.name);
        if (response.userData.thumbnail) {
          setTitle(response.userData.thumbnail);
        }
        if (response.userData.about) {
          setAboutMe(response.userData.about);
        }
      }
    });
  }, [user]);

  const handleUpdate = async () => {

    if (title.length < 5 || title.length > 20) {
      setErrors((prev) => ({
        ...prev,
        thumbnail: true,
      }));
      return toast.error("Thumbnail should me in between 5 - 20 length");
    }
    if (name.length == 0 || name.length > 20) {
      setErrors((prev) => ({
        ...prev,
        userName: true,
      }));
      return toast.error("User name should me in between 1 - 20 length");
    }
    if (aboutMe.length > 600 || aboutMe.length < 10) {
      setErrors((prev) => ({
        ...prev,
        aboutMe: true,
      }));
      return toast.error("About me should me in between 10 - 600 length");
    }

   
     await doRequest({
        url:`${userRoutes.editUser}/${user.id}`,
        body:{name,thumbnail:title,aboutMe},
        method:"patch",
        onSuccess:(response)=>{
          toast.success("Profile updated succesffuly");
          dispatch(profileUpdated(response.user.name));
          return navigate(-1);
        }
      });
 
  };

  useEffect(()=>{
     errors?.map((err)=>toast.error(err.message))
  },[errors])
  return (
    <div className="bg-blue-50">
      <Header />
      <ProfileNavbar />
      <div className="flex items-center justify-center text-center">
        <p className="text-2xl font-semibold my-5 underline">Edit your profile</p> 
      </div>
      <div className="flex items-center justify-center">
        
        <form className="w-75 space-y-5">
        {/* */}
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message-2">Username</Label>
          <Input
            value={name}
            onChange={(e) => {
              setErrors((prev) => ({
                ...prev,
                userName: false,
              }));
              setName(e.target.value);
            }}
            className="w-full"
            placeholder="Type your username here."
            id="message-2"
          />
          {error.userName ? (
            <p className="text-sm text-muted-foreground text-danger">
              Please provide a valid Username
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Your Username will show to the all other users
            </p>
          )}
        </div>
        <div className="grid w-75 gap-1.5">
          <Label htmlFor="message-2">Thumbnail</Label>
          <Input
            value={title}
            onChange={(e) => {
              setErrors((prev) => ({
                ...prev,
                thumbnail: false,
              }));
              setTitle(e.target.value);
            }}
            placeholder="Type your Title here."
            id="message-2"
          />
          {error.thumbnail ? (
            <p className="text-sm text-muted-foreground text-danger">
              Please provide a valid Thumbnail
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Your Thumbnail will show to the all other users
            </p>
          )}
        </div>

        <div className="grid w-75 gap-1.5">
          <Label htmlFor="message-2">About me</Label>
          <Textarea
            className="h-[150px]"
            value={aboutMe}
            onChange={(e) => {
              setErrors((prev) => ({
                ...prev,
                aboutMe: false,
              }));
              setAboutMe(e.target.value);
            }}
            placeholder="Type your Title here."
            id="message-2"
          />
          {error.aboutMe ? (
            <p className="text-sm text-muted-foreground text-danger">
              Please provide a valid About me
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Your Username will show to the all other users
            </p>
          )}
        </div>
        <div className="flex justify-end gap-3 items-end w-50">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-500 text-white">
                Cancel
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will change all the changes
                  you made.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  className="bg-teal-500 hover:bg-teal-500"
                  type="button"
                >
                  Cancel
                </AlertDialogAction>
                <AlertDialogAction
                  onClick={() => navigate(-1)}
                  type="button"
                  className="bg-teal-500 hover:bg-teal-500"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="bg-teal-500 hover:bg-teal-500 text-white">
                Edit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently store
                  datas in our server.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction
                  className="bg-teal-500 hover:bg-teal-500"
                  type="button"
                >
                  Cancel
                </AlertDialogAction>
                <AlertDialogAction
                  onClick={handleUpdate}
                  type="button"
                  className="bg-teal-500 hover:bg-teal-500"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
