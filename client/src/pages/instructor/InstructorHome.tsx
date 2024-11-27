// import { Card, CardContent, CardHeader } from '@/Components/ui/card';
// import './InstructorHome.css';
// import InstructorAside from '../../Components/instructor/InstructorAside'
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// interface Course {
//     name: string;
//     registered: number;
//   }
//   interface User{
//     id:string;
//     name:string;
//     email:string;
//     isAdmin:boolean;
//     isInstructor:boolean;
//     isBlock:boolean;
//   }
//   interface Review {
//     name: string;
//     comment: string;
//     avatar: string;
//   }
  
// const InstructorHome = () => {
//     const courses: Course[] = [
//         { name: "HTML", registered: 80 },
//         { name: "React", registered: 70 },
//         { name: "Node.js", registered: 60 },
//       ];
//       const reviews: Review[] = [
//         { name: "Lina", comment: "Very good class, cover every parts", avatar: "/api/placeholder/32/32" },
//         { name: "John", comment: "Nice presentation", avatar: "/api/placeholder/32/32" },
//         { name: "Rocky", comment: "Good work", avatar: "/api/placeholder/32/32" },
//       ];
//       const userr = useSelector((state)=>state)
//     // console.log("user starte",userr);
//     const user = useSelector((state:User)=>state.name);
//     const navigate = useNavigate()
//   return (
//     <div className="container-fluid">
//     <div className="row">
//         <InstructorAside/>
//         <div className="col-md-10">
                  
//             <div className="welcome mt-4 mb-4">
//                 <h1>Welcome back, {user}</h1>
//                 <img src="https://via.placeholder.com/50" alt="Profile Picture" onClick={()=>navigate("/instructor/profile")} className="profile-pic" />
//             </div>

           
//             <div className="grid grid-cols-2 gap-8">
       
//             <Card>
//               <CardHeader>
//                 <h2 className="text-lg font-semibold">YOUR TOP 3 COURSES</h2>
//               </CardHeader>
//               <CardContent>
//                 {courses.map((course, index) => (
//                   <div key={index} className="mb-4 last:mb-0">
//                     <div className="font-medium">{course.name}</div>
//                     <div className="text-sm text-gray-500">{course.registered} Registed</div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>

      
//             <Card>
//               <CardHeader>
//                 <h2 className="text-lg font-semibold">Reviews</h2>
//               </CardHeader>
//               <CardContent>
//                 {reviews.map((review, index) => (
//                   <div key={index} className="flex items-center gap-3 mb-4 last:mb-0">
//                     <img 
//                       src={review.avatar} 
//                       alt={review.name} 
//                       className="w-8 h-8 rounded-full"
//                     />
//                     <div>
//                       <div className="font-medium">{review.name}</div>
//                       <div className="text-sm text-gray-500">{review.comment}</div>
//                     </div>
//                   </div>
//                 ))}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//     </div>
// </div>
//   )
// }

// export default InstructorHome




// import SettingsProfilePage from "./profileHead"
// import { SidebarNav } from "./sideBar"
// import { Separator } from "./ui/separator"

import InstructorAside from "@/Components/instructor/InstructorAside"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Separator } from "@/Components/ui/separator"
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"





export default function InstructorHome() {
  return (
    <div className="bg-black">
      <div className="md:hidden">
        <img
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <img
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-white text-2xl font-bold tracking-tight">Edu Hub</h2>
          <p className="text-muted-foreground">
            Manage your instructor account students and courses.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        
       
              <InstructorAside  />
              
       
          <div className="flex-1 lg:max-w-full">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 bg-gray-950 text-white">
                  <CardHeader>
                    <CardTitle>Top 5 courses</CardTitle>
                  <CardDescription>
                      This is your top 5 courses this far
                  </CardDescription>
                  </CardHeader>
                  <CardContent>
              <div className="space-y-5">
              <div className="flex items-center">
                  <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ansifpk</p>
                    <p className="text-sm text-muted-foreground">Learn recat with ansif</p>
                  </div>
                  <div className="ml-auto font-medium">RS:500</div>
                </div>
                <div className="flex items-center">
                  <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ansifpk</p>
                    <p className="text-sm text-muted-foreground">Learn recat with ansif</p>
                  </div>
                  <div className="ml-auto font-medium">RS:500</div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ansifpk</p>
                    <p className="text-sm text-muted-foreground">Learn recat with ansif</p>
                  </div>
                  <div className="ml-auto font-medium">RS:500</div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>WK</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ansifpk</p>
                    <p className="text-sm text-muted-foreground">Learn recat with ansif</p>
                  </div>
                  <div className="ml-auto font-medium">RS:500</div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ansifpk</p>
                    <p className="text-sm text-muted-foreground">Learn recat with ansif</p>
                  </div>
                  <div className="ml-auto font-medium">RS:500</div>
                </div>
              </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3 bg-gray-950 text-white">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 5 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
              <div className="space-y-5">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ansifpk</p>
                    <p className="text-sm text-muted-foreground">ansifpk@email.com</p>
                  </div>
                  <div className="ml-auto font-medium">RS:1000</div>
                </div>
                <div className="flex items-center">
                  <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ansifpk</p>
                    <p className="text-sm text-muted-foreground">ansifpk@email.com</p>
                  </div>
                  <div className="ml-auto font-medium">RS:1000</div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ansifpk</p>
                    <p className="text-sm text-muted-foreground">ansifpk@email.com</p>
                  </div>
                  <div className="ml-auto font-medium">RS:1000</div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>WK</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ansifpk</p>
                    <p className="text-sm text-muted-foreground">ansifpk@email.com</p>
                  </div>
                  <div className="ml-auto font-medium">RS:1000</div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Ansifpk</p>
                    <p className="text-sm text-muted-foreground">ansifpk@email.com</p>
                  </div>
                  <div className="ml-auto font-medium">RS:1000</div>
                </div>
              </div>
                  </CardContent>
                </Card>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}