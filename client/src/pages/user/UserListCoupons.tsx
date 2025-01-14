import { ICoupon } from "@/@types/couponType";
import { User } from "@/@types/userType";
import { fetchCoupons } from "@/Api/user";
import Footer from "@/Components/Footer/Footer";
import Header from "@/Components/Header/Header";
import ProfileNavbar from "@/Components/Header/ProfileNavbar";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription } from "@/Components/ui/card";
import { Code } from "@nextui-org/code";
import { Copy } from "lucide-react";
import { timeStamp } from "node:console";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const UserListCoupons :React.FC = () => {
   
  const userId = useSelector((state:User)=>state.id)
  const [coupons, setCoupons] = useState([]);
  let date = new Date();
  let today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  
  
  
  useEffect(() => {
    const fetching = async () => {
      const data = await fetchCoupons();
      if (data.success) {
        setCoupons(data.coupons);
      }
    };
    fetching();
  }, []);

  console.log(coupons);
  

  return (
    <div className='bg-blue-50'>
    <Header />
    <ProfileNavbar/>
    <main className="w-full mx-auto flex justify-center flex-wrap gap-10"> 
    {coupons.length > 0 ? ( 
         coupons
         .filter((valu:ICoupon)=> date > new Date(valu.startingDate))
         .map((value:ICoupon,index)=>(
       
          <div key={index} className={`w-[350px] h-[250px] border-1 rounded-3 p-2 mt-5 ${!value.users.includes(userId)?date > new Date(value.expiryDate)?"bg-danger-100 border-danger":"bg-success-50 border-success-500":"bg-gray-100 border-gray-500"}`}>
           
          <div>
            <div className="flex justify-between items-center">
             
            <h3>Flate {value.offer}% off</h3>
           
            <Code className={!value.users.includes(userId)?date > new Date(value.expiryDate)?"bg-danger-200 text-danger":"bg-success-200 text-success":"bg-gray-200 text-gray-500"} >{!value.users.includes(userId)?date > new Date(value.expiryDate)?"Expired":"Active":"Used"}</Code>
            </div>
             <p>{value.title}</p>
          </div>
          <div className="flex justify-between" >
            <div className="text-primary ">
               code : {value.couponCode} 
            </div>  
         
            <Button  size="sm" disabled={!value.users.includes(userId)?date>new Date(value.startingDate)?date < new Date(value.expiryDate)?false:true:true:true} className="bg-white hover:bg-blue-50 text-primary"  onClick={()=>{
               navigator.clipboard
               .writeText(value.couponCode)
               .then(()=>{
                toast.success("copyed success")
               })
               .catch(()=>{
                toast.error("copyed failed")
               })
            }}>
            <span >Copy</span>
            <Copy className="color-primary text-primary" />
          </Button>
         
          </div>
         <div>
         <div className="flex gap-2">
         <div className="text-muted-foreground">*</div>
        <div className="text-muted-foreground text-xs"> {value.startingDate.slice(0,10)} - {value.expiryDate.slice(0,10)}
        </div>
         </div>
        <div className="flex gap-2">
          <p className="text-muted-foreground">*</p>
        <p className="text-muted-foreground text-sm"> {value.description}
        </p>
        </div>
         </div>
        </div>
         ))
       ) : (
        <>
          <div className=" h-full flex justify-center items-center mt-5">
            <Card className="w-1/2 h-[200px] d-flex justify-center items-center">
              <CardContent className="d-flex items-center">
                <CardDescription>No coupons available</CardDescription>
              </CardContent>
            </Card>
          </div>
        </>
      )} 
    </main>
    <Footer />
  </div>
  )
}

export default UserListCoupons
