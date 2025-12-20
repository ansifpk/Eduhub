import type { ICoupon } from '@/@types/couponType'
import type { IUser } from '@/@types/userType'
import Footer from '../../components/user/Footer'
import Header from '../../components/user/Header'
import ProfileNavbar from '../../components/user/ProfileNavbar'
import useRequest from '@/hooks/useRequest'
import userRoutes from '@/service/endPoints/userEndPoints'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const Coupon = () => {

  const [coupons,setCoupons] = useState<ICoupon[]>([]);
  const userId = useSelector((state:IUser)=>state._id);
  const date = new Date();

   const {doRequest,err} = useRequest()

  useEffect(() => {
    const fetching = async () => {
      doRequest({
        url:userRoutes.coupons,
        body:{},
        method:"get",
        onSuccess:(res)=>{
          setCoupons(res.coupons);
        }
      })
    };
    fetching();
  }, []);

  useEffect(()=>{
    err?.map((err)=>toast.error(err.message))
  },[err]);

  if(coupons.length <= 0){
      return (
       <div>
        <Header />
        <div className="w-full">
          <ProfileNavbar value="Coupons" />
          <main>
             <div className="h-[60vh] flex justify-center items-center gap-5">
              <strong>No coupons available</strong>
            </div>
          </main>
        </div>
        <Footer />
      </div>
      )
  }
  
  return (
     <div>
      <Header />
      <div className="w-full">
        <ProfileNavbar value="Coupons" />
        <main className="w-full grid md:grid-cols-4  justify-center items-center md:p-8 p-2 gap-2">
          {
            coupons
            .filter((valu: ICoupon) => date > new Date(valu.startingDate))
            .map((value: ICoupon, index) => (
              <div
                key={index}
                className={`border-1 rounded p-1 sm:m-1 lg:mx-auto md:mx-auto sm:mx-auto mx-auto ${
                  !value.users.includes(userId)
                    ? date > new Date(value.expiryDate)
                      ? "bg-red-100 border-danger"
                      : "bg-green-50 border-green-500"
                    : "bg-gray-100 border-gray-500"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h3>Flate {value.offer}% off</h3>
                    <span className={
                        
                        !value.users.includes(userId)
                          ? date > new Date(value.expiryDate)
                            ? "bg-red-200 text-red-600 p-1 rounded"
                            : "bg-green-200 text-green-600 p-1 rounded"
                          : "bg-gray-200 text-gray-500 p-1 rounded"
                      }>{!value.users.includes(userId)
                        ? date > new Date(value.expiryDate)
                        ? "Expired"
                        : "Active"
                        : "Used"}</span>
                  </div>
                  <span>{value.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-primary text-xs ">
                    code : {value.couponCode}
                  </div>
                  <button
                    disabled={
                      !value.users.includes(userId)
                        ? date > new Date(value.startingDate)
                          ? date < new Date(value.expiryDate)
                            ? false
                            : true
                          : true
                        : true
                    }
                    className="bg-white hover:bg-blue-50 text-primary"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(value.couponCode)
                        .then(() => {
                          toast.success("copyed success");
                        })
                        .catch(() => {
                          toast.error("copyed failed");
                        });
                    }}
                  >
                    <span className="text-xs">Copy</span>
                    <i className="bi bi-copy color-primary text-primary text-xs"></i>
                   
                  </button>
                </div>
                <div>
                  <div className="flex gap-2">
                    <div className="text-muted-foreground">*</div>
                    <span className="text-muted-foreground text-xs">
                      {" "}
                      {value.startingDate.slice(0, 10)} -{" "}
                      {value.expiryDate.slice(0, 10)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground">*</span>
                    <span className="text-muted-foreground text-sm">
                      {" "}
                      {value.description}
                    </span>
                  </div>
                </div>
              </div>
            ))
          }
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default React.memo(Coupon)
