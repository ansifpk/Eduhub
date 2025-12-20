import Header from "@/components/user/Header";
import ProfileNavbar from "../../components/user/ProfileNavbar";
import Footer from "@/components/user/Footer";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useRequest from "@/hooks/useRequest";
import userRoutes from "@/service/endPoints/userEndPoints";
import { useDispatch, useSelector } from "react-redux";
import type { IUser } from "@/@types/userType";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  type ProfileFormInputs,
} from "@/util/schemas/profileScheema";
import { changeImage, profileUpdated } from "@/redux/authSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const userId = useSelector((state: IUser) => state._id);
  const { doRequest, err } = useRequest();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [edit, setEdit] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState({
    id: "" as string,
    avatar_url: "" as string | File,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      aboutMe: "",
      thumbnail: "",
    },
  });

  useEffect(() => {
    doRequest({
      url: `${userRoutes.profile}?userId=${userId}`,
      method: "get",
      body: {},
      onSuccess: (response) => {
        setUser(response.userData.email);
        setValue("name", response.userData.name);
        setValue("aboutMe", response.userData.about || "");
        setValue("thumbnail", response.userData.thumbnail || "");
        setImage({
          id: response.userData.avatar.id,
          avatar_url: response.userData.avatar.avatar_url,
        });
      },
    });
  }, [userId, edit]);

  const changeProfile = async (file: File) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    setImageLoading(true);
    doRequest({
      url: `${userRoutes.profileImage}/${userId}`,
      method: "patch",
      body: formData,
      onSuccess: (res) => {
        dispatch(changeImage(res.image));
        setImageLoading(false);
        setFileToBase(file);
        toast.success("Successfully updated your profile...");
      },
    });
  };

  const setFileToBase = async (file: File): Promise<void> => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImage((prev) => ({
          ...prev,
          avatar_url: reader.result as string,
        }));
      }
    };
  };

  const handleEdit = (data: ProfileFormInputs) => {
    setLoading(true)
    doRequest({
      url: `${userRoutes.editUser}/${userId}`,
      body: {
        name: data.name,
        thumbnail: data.thumbnail,
        aboutMe: data.aboutMe,
      },
      method: "patch",
      onSuccess: (response) => {
        setEdit(!edit);
        setLoading(false)
        toast.success("Profile updated succesffuly");
        dispatch(profileUpdated(response.user.name));
      },
    });
  };

  const handleButtonClick = () => {
    fileInputRef!.current!.click();
  };

  useEffect(() => {
    setLoading(false);
    setImageLoading(false);
    err?.map((err) => toast.error(err.message));
  }, [err]);

  return (
    <div>
      <Header />
      <div className="h-screen w-full">
        <ProfileNavbar value="Profile" />
        <main className="w-full  md:p-8 p-2">
          <div>
            <div className="flex gap-10">
              <div className="w-50">
                <div className="m-3 md:w-48 md:h-48 w-24 h-24  rounded-full overflow-hidden bg-gray-200">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={image.avatar_url as string} />
                    <AvatarFallback>
                      <i className="bi bi-person-circle text-8xl "></i>
                    </AvatarFallback>
                  </Avatar>
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
                          changeProfile(val);
                        }
                      }
                    }}
                    className="hidden"
                  />

                  <button
                    onClick={handleButtonClick}
                    disabled={imageLoading}
                    className={`${
                      imageLoading ? "" : "cursor-pointer"
                    } rounded-lg transition-all hover:scale-110 bg-teal-500 text-center text-white md:text-sm text-xs md:px-3 px-2 py-1 rounded-2 `}
                  >
                    change profile
                  </button>
                  <div
                    onClick={() => navigate("/user/changeEmail")}
                    className="transition-all hover:scale-110 cursor-pointer rounded-lg text-center bg-teal-500 text-white md:text-sm text-xs md:px-3 px-2 py-1 rounded-2 "
                  >
                    change email
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(handleEdit)}
                className="w-full md:p-5 p-1 space-y-2 border-2"
              >
                <div className="flex md:gap-5 gap-0.5 ">
                  <div>
                    <label>Name</label>
                    <input
                      {...register("name")}
                      className="shadow-lg  px-4 py-2 border border-teal-400 rounded-full md:w-full text-xs w-70 "
                      readOnly={!edit}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label>Email</label>
                    <input
                      defaultValue={user}
                      className="shadow-lg px-4 py-2 border border-teal-400 rounded-full md:w-full text-xs w-70"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <label>Thumbnail</label>
                  <textarea
                    {...register("thumbnail")}
                    className=" px-4 py-2 border border-teal-400 rounded shadow-lg md:text-sm w-full text-xs"
                    readOnly={!edit}
                  />
                  {errors.thumbnail && (
                    <p className="text-red-500 text-sm">
                      {errors.thumbnail.message}
                    </p>
                  )}
                </div>
                <div>
                  <label>About Me</label>
                  <textarea
                    {...register("aboutMe")}
                    className="h-[150px] px-4 py-2 border border-teal-400 rounded shadow-lg md:text-sm w-full text-xs"
                    readOnly={!edit}
                  />
                  {errors.aboutMe && (
                    <p className="text-red-500 text-sm">
                      {errors.aboutMe.message}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setEdit(!edit)}
                  type="button"
                  className={`m-2 cursor-pointer transition-all hover:scale-110 py-2 px-4 text-white rounded font-semibold text-xs bg-teal-500 hover:bg-teal-300 ${
                    edit ? "hidden" : "block"
                  }`}
                >
                  Edit
                </button>
                <div className="flex">
                  {edit && (
                    <button
                      onClick={() => {
                        setEdit(!edit);
                        setValue("name", "");
                        setValue("aboutMe", "");
                        setValue("thumbnail", "");
                      }}
                      type="button"
                      className={`m-2 cursor-pointer transition-all hover:scale-110 py-2 px-4 text-white rounded font-semibold text-xs bg-teal-500 hover:bg-teal-300`}
                    >
                      cancell
                    </button>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button
                        disabled={loading}
                        className={`m-2 ${loading?"bg-teal-300":'cursor-pointer transition-all hover:scale-110 hover:bg-teal-300 bg-teal-500'} flex  py-2 px-4 text-white rounded font-semibold text-xs   ${
                          edit ? "block" : "hidden"
                        }`}
                        type="button"
                      >
                        {
                          loading?
                          
                            <><span>Loading...</span><Loader2 className="ml-3 h-5 w-5 animate-spin" /></>
                          
                          :"save"
                        }
                        
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          save this information to our database.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="text-white transition-all cursor-pointer hover:scale-110 bg-teal-500 hover:bg-teal-300 hover:text-white">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleSubmit(handleEdit)()}
                          className="bg-teal-500 transition-all hover:scale-110 cursor-pointer hover:bg-teal-300"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default React.memo(Profile);
