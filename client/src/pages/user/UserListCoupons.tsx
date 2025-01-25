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

const UserListCoupons: React.FC = () => {
  const userId = useSelector((state: User) => state.id);
  const [coupons, setCoupons] = useState([]);
  let date = new Date();
  let today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

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
    <div className="w-full h-screen">
      <Header />
      <ProfileNavbar />
      <main className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-1  sm:gap-1 sm:m-1  ">
        {coupons.length > 0 ? (
          coupons
            .filter((valu: ICoupon) => date > new Date(valu.startingDate))
            .map((value: ICoupon, index) => (
              <div
                key={index}
                className={`md:w-[250px] md:h-[200px] sm:w-[300px] sm:h-[200px] lg:w-[330px] lg:h-[170px] w-[235px]  h-[170px] border-1 rounded-3 p-1 sm:m-1 lg:mx-auto md:mx-auto sm:mx-auto mx-auto ${
                  !value.users.includes(userId)
                    ? date > new Date(value.expiryDate)
                      ? "bg-danger-100 border-danger"
                      : "bg-success-50 border-success-500"
                    : "bg-gray-100 border-gray-500"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center">
                    <h3>Flate {value.offer}% off</h3>

                    <Code
                      className={
                        !value.users.includes(userId)
                          ? date > new Date(value.expiryDate)
                            ? "bg-danger-200 text-danger"
                            : "bg-success-200 text-success"
                          : "bg-gray-200 text-gray-500"
                      }
                    >
                      {!value.users.includes(userId)
                        ? date > new Date(value.expiryDate)
                          ? "Expired"
                          : "Active"
                        : "Used"}
                    </Code>
                  </div>
                  <span>{value.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-primary text-xs ">
                    code : {value.couponCode}
                  </div>
                  <Button
                    size="sm"
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
                    <Copy
                      size={"sm"}
                      className="color-primary text-primary text-xs "
                    />
                  </Button>
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
  );
};

export default UserListCoupons;
