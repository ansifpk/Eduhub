import AdminAside from '@/Components/admin/AdminAside'
import { Card,CardContent,CardHeader } from '@/Components/ui/card';
import { useEffect, useState } from 'react';
import { Button } from '@/Components/ui/button';
import { useNavigate } from 'react-router-dom';
import { category, listCategory } from '@/Api/admin';
import toast from 'react-hot-toast';

interface ICategory{
  _id?:string;
  title:string;
  isListed:boolean;
  description:string;
}

const AdminCategory = () => {
    const [categories,setCategories] = useState([])
    const navigate = useNavigate();
    useEffect(()=>{
      const fetchAllCategories = async () => {
          const response = await category();
          setCategories(response); 
      }
      fetchAllCategories()
    },[]);
    const handleListCategory = async (id:string) => {
      const response = await listCategory(id)
      
      if(response.success){
        if(response.data.isListed){
          const res = await category();
          setCategories(res); 
           toast.success("Successfully UnListed Category")
           return;
        }else{
          const res = await category();
          setCategories(res); 
          return toast.success("Successfully Listed Category")
        }
        
      }else{
       return  toast.error(response.response.data.message)
      }
      
    }
  return (
    <div className="container-fluid ">
    <div className="row">
        <AdminAside/>
        <div className="col-md-10">   
            <div className="welcome mt-4 mb-4 bg-purple-600">
                <h1>Welcome back, Admin</h1>
                <img src="https://via.placeholder.com/50" alt="Profile Picture" className="profile-pic" />
            </div>
            <div className="grid grid-cols-1">
            <Card>
              <CardHeader>
                <div className='d-flex justify-content-between'>
                   <h2 className="text-lg font-semibold">Categories</h2>
                   <Button onClick={()=>navigate("/admin/addCategory")} >Add Categories</Button>
                </div>
              </CardHeader>
              <CardContent>
                {categories.length>0?(
                  categories.map((category:ICategory, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="font-medium">{category.title}</div>
                      <div className="text-sm text-gray-500">{category.description}</div>
                      <Button onClick={()=>navigate(`/admin/editCategory/${category._id}`)}>Edit</Button>
                      <button className={category.isListed ? 'btn btn-success' : 'btn btn-danger'}  onClick={()=>handleListCategory(category._id!)} > {category.isListed ? "UnList":"List"} </button>
                    </div>
                  ))
                ):(
                  <div className="font-medium">No Categories</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
</div>
  )
}

export default AdminCategory
