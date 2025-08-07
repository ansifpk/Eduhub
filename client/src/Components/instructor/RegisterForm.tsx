import { setInstructor, setUser } from "../../redux/authSlice";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useRequest from "../../hooks/useRequest";
import instructorRoutes from "../../service/endPoints/instructorEndPoints";
import toast from "react-hot-toast";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { User } from "../../@types/userType";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { register } from "../../Api/instructor";




const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const { doRequest, errors } = useRequest();
  const [page, setPage] = useState(1);
  const userName = useSelector((state: User) => state.name);
  const userEmail = useSelector((state: User) => state.email);
  const [cv, setCv] = useState({
    id:"" as string,
    cv_url:"" as string | File
  });
  const [certificate, setCertificate] = useState({
    id:"" as string,
    certificate_url:"" as string | File
  });

  const [email,setEmail] = useState<string>(userEmail||"");
  const [name,setName] = useState<string>(userName||"");
  const [experience,setExperience] = useState<string>("");
  const [qualification,setQualification] = useState<string>("");
  const navigate = useNavigate();
 

  const onSubmit = async (e:FormEvent) => {
  e.preventDefault()
  if(!name || !email || !qualification || !experience || !certificate || !cv){
      return toast.error("Please provide all informations")
  };
  setLoading(true)
  const response = await register({name,email,qualification,experience,certificate,cv})
  if(response.success){
   setLoading(false)
   toast.success(`successfully applyed
      we sent an email after review your informations.`)
    return navigate("/instructor")
  }else{
   setLoading(false)
   return toast.error(response.response.data.message)
  }
  };




  useEffect(() => {
    setLoading(false);
    errors?.map((err) => toast.error(err.message));
  }, [errors]);

  return (
    <>
        <form
          onSubmit={onSubmit}
          className="w-full space-y-6"
        >
          {
            page==1?(
              <>
                <div className={`grid w-full max-w-sm items-center gap-1.5`}>
                      <Label htmlFor="CV">Email</Label>
                      <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value.trim())} className={`rounded-full border-1 border-teal-400`} id="email" placeholder="Email" />
                    
                  </div>
                <div className={`grid w-full max-w-sm items-center gap-1.5`}>
                      <Label htmlFor="Name">Name</Label>
                      <Input type="text"  value={name} onChange={(e)=>setName(e.target.value)} className={`rounded-full border-1 border-teal-400`} id="email" placeholder="Name" />
                     
                  </div>
              </>
            ):(
            <>
               <div className={`grid w-full max-w-sm items-center gap-1.5`}>
                      <Label htmlFor="CV">Qualification</Label>
                      <Input type="text" required onChange={(e)=>setQualification(e.target.value.trim())} className={`rounded-full border-1 border-teal-400`} id="email" placeholder="Qualification" value={qualification} />
                     
                  </div>
                  <div className="space-y-2 flex flex-col ">
                      <label className="w-full text-sm font-medium text-gray-700">
                        What kind of teaching have you done before?
                      </label>
                       <Select defaultValue={experience} required onValueChange={(value) => setExperience(value)}>
                          <SelectTrigger   className="w-full rounded-full border-1 border-teal-600">
                            <SelectValue  placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent  >
                            <SelectGroup >
                              <SelectItem value="In person, Informally">In person, Informally</SelectItem>
                              <SelectItem value="In person, Profesionally">In person, Profesionally</SelectItem>
                              <SelectItem value="Online">Online</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      
                    </div>
                <div className={`grid w-full max-w-sm items-center gap-1.5`}>
                      <Label  htmlFor="CV">Upload Certificate</Label>
                      <Input required type="file" accept="image/*" onChange={(e)=>{
                         if(e.target.files?.[0]){
                          setCertificate({
                            id:"1",
                            certificate_url:e.target.files?.[0]
                          })
                        }
                      }} className={`rounded-full border-1 border-teal-400`} id="email" placeholder="Certificate" />
                     
                  </div>
                <div className={`grid w-full max-w-sm items-center gap-1.5`}>
                      <Label htmlFor="CV">Upload CV</Label>
                      <Input required type="file" accept="image/*" onChange={(e)=>{
                        if(e.target.files?.[0]){
                          setCv({
                            id:`1`,
                            cv_url:e.target.files?.[0]
                          });

                          
                        }
                      }} className={`rounded-full border-1 border-teal-400`} id="email" placeholder="cv" />
                     
                  </div>
            </>
            )
          }
              
          <div className="flex justify-between">
            {page == 1 ? (
              <>
                <Button
                  className="rounded-full bg-teal-400 hover:bg-teal-600"
                  onClick={() => setPage(2)}
                >
                  Next
                </Button>
              </>
            ) : (
              <div>
                <Button
                  className="rounded-full bg-teal-400 hover:bg-teal-600"
                  onClick={() => setPage(1)}
                >
                  Prev
                </Button>
                <Button
                  disabled={loading}
                  type="submit"
                  className="rounded-full bg-teal-400 hover:bg-teal-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    <>
                      Register
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
            
            <span className="text-blue ">{page}/2</span>
          </div>
        </form>
    </>
  );
};

export default RegisterForm;
