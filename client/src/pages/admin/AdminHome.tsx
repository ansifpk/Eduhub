import {Card, CardContent, CardHeader  } from '../../Components/ui/card';
import AdminAside from '../../Components/admin/AdminAside';
import { Avatar, AvatarImage } from '@/Components/ui/avatar';
import { useNavigate } from 'react-router-dom';

interface Course {
    name: string;
    registered: number;
  }
  
  interface Review {
    name: string;
    comment: string;
    avatar: string;
  }
  
const AdminHome = () => {
    const courses: Course[] = [
        { name: "HTML", registered: 80 },
        { name: "React", registered: 70 },
        { name: "Node.js", registered: 60 },
      ];
      const reviews: Review[] = [
        { name: "Lina", comment: "Very good class, cover every parts", avatar: "/api/placeholder/32/32" },
        { name: "John", comment: "Nice presentation", avatar: "/api/placeholder/32/32" },
        { name: "Rocky", comment: "Good work", avatar: "/api/placeholder/32/32" },
      ];
       const navigate = useNavigate()
  return (
    <div className="container-fluid ">
    <div className="row">
        <AdminAside/>
        <div className="col-md-10">
                  
            <div className="welcome mt-4 mb-4 bg-purple-600">
                <h1>Welcome back, Admin</h1>
                <Avatar>
                     <AvatarImage onClick={()=>navigate("/admin/profile")} className='avatar' src="https://github.com/shadcn.png" />
                </Avatar>
            </div>

           
            <div className="grid grid-cols-2 gap-8">
            {/* Courses Section */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">YOUR TOP 3 COURSES</h2>
              </CardHeader>
              <CardContent>
                {courses.map((course, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-gray-500">{course.registered} Registed</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Reviews</h2>
              </CardHeader>
              <CardContent>
                {reviews.map((review, index) => (
                  <div key={index} className="flex items-center gap-3 mb-4 last:mb-0">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{review.name}</div>
                      <div className="text-sm text-gray-500">{review.comment}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
</div>
  )
}

export default AdminHome
