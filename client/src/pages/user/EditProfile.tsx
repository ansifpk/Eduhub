import ProfileNavbar from "@/Components/Header/ProfileNavbar";
import Header from "../../Components/Header/Header";
import { useNavigate } from "react-router-dom";
import React, {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { User } from "@/@types/userType";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import Footer from "@/Components/Footer/Footer";
import { editUser, getUserDetailes, logout } from "@/Api/user";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeUser, profileUpdated } from "@/redux/authSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Textarea } from "@/Components/ui/textarea";
import { IUser } from "@/@types/chatUser";

const EditProfile: React.FC = () => {
  const user = useSelector((state: User) => state);
  const [User, setUser] = useState<IUser>();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("Hi im a Student");
  const [aboutMe, setAboutMe] = useState(
    `Hi everyone, I’m ${name}, a student on EduHub, and I’m thrilled to be here! This platform has been incredibly helpful in my learning journey. The variety of courses available, taught by expert instructors, has allowed me to dive deep into new areas and build valuable skills. What I love most about EduHub is the supportive community of like-minded learners who share the same passion for growth. With flexible learning options and expert guidance, EduHub makes it easy for anyone to improve their skills. I’m excited to continue learning and growing here, and I hope you are too!`
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    userName: false,
    thumbnail: false,
    aboutMe: false,
  });
  useEffect(() => {
    const fetch = async () => {
      const response = await getUserDetailes(user.id);

      if (response.success) {
        setUser(response.userData);
        setName(response.userData.name);
        if (response.userData.thumbnail) {
          setTitle(response.userData.thumbnail);
        }
        if (response.userData.about) {
          setAboutMe(response.userData.about);
        }
        setUser(response.userData);
      } else if (response.status == 403) {
        const resp = await logout();
        if (resp.succuss) {
          localStorage.setItem("accessToken", "");
          localStorage.setItem("refreshToken", "");
          dispatch(removeUser());
          toast.error(response.response.data.message);
          return navigate("/users/login");
        }
      } else {
        return toast.error(response.response.data.message);
      }
    };
    fetch();
  }, [user]);

  const handleUpdate = async () => {
    console.log(title.length, name, aboutMe.length);
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

    try {
      const response = await editUser(user.id, name, title, aboutMe);

      if (response.success) {
        toast.success("Profile updated succesffuly");
        dispatch(profileUpdated(response.user.name));
        return navigate(-1);
      } else if (response.status == 403) {
        const resp = await logout();
        if (resp.succuss) {
          localStorage.setItem("accessToken", "");
          localStorage.setItem("refreshToken", "");
          dispatch(removeUser());
          toast.error(response.response.data.message);
          return navigate("/users/login");
        }
      } else {
        return toast.error(response.response.data.message);
      }
    } catch (error) {
      return toast.error(`${error}`);
    }
  };
  return (
    <div className="bg-blue-50">
      <Header />
      <ProfileNavbar />
      <main className="flex flex-col w-full items-center justify-center   px-6 py-8">
        {/* <Card>
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
              <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button className='rounded-full bg-[#49BBBD]' >Edit</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot undone later
                          Are you sure to update your profile?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction className='rounded-full bg-[#49BBBD]' type='button'  >Cancel</AlertDialogAction>
                        <AlertDialogAction className='rounded-full bg-[#49BBBD]' onClick={handleUpdate} type='button'>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

              </div>
            </div>
          </form>
          </div>
        </Card> */}
        <div className="grid w-50 gap-1.5">
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
            placeholder="Type your username here."
            id="message-2"
          />
          {errors.userName ? (
            <p className="text-sm text-muted-foreground text-danger">
              Please provide a valid Username
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Your Username will show to the all other users
            </p>
          )}
        </div>
        <div className="grid w-50 gap-1.5">
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
          {errors.thumbnail ? (
            <p className="text-sm text-muted-foreground text-danger">
              Please provide a valid Thumbnail
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Your Thumbnail will show to the all other users
            </p>
          )}
        </div>

        <div className="grid w-50 gap-1.5">
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
          {errors.aboutMe ? (
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
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile;
