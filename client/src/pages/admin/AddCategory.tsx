import AdminAside from '@/Components/admin/AdminAside'
import { Card,CardContent,CardHeader } from '@/Components/ui/card';
import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import toast from 'react-hot-toast';
import { addCategory } from '@/Api/admin';


const AdminCategory:React.FC = () => {
    const [topics,setTopics] = useState<string[]>([])
    const [subCategory,setsubCategory] = useState('')
    const [title,setTitle] = useState("")
    const [description,setDiscription] = useState("")

    const navigate = useNavigate();
    const handleSubCategory = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(topics.length <8){
          setTopics((prevState)=>[...prevState,subCategory])
          setsubCategory("")
          toast.success("sub Category added")
        }else{
          setsubCategory("")
          toast.error("maximum limite exceeded")
        }
    }
    const handleCategory = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        const respose = await addCategory({title,description,topics})
       
        if(respose.success){
          toast.success(" Category added")
          return navigate('/admin/category')
        }else{
          toast.error(respose.response.data.message)
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
                   <h2 className="text-lg font-semibold">Add New Category</h2>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCategory}>
                    <div  className='d-flex justify-content-between'>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                       <Label htmlFor="Title">Title</Label>
                       <Input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} id="Title" placeholder="Title" />

                       <Label htmlFor="Deacription">Deacription</Label>
                       <Textarea value={description} onChange={(e)=>setDiscription(e.target.value)} maxLength={100} placeholder="Add your Deacription here." />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                     <div>    
                          <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" value={subCategory} onChange={(e)=>setsubCategory(e.target.value.trim())} placeholder="Sub Categories" />
                            <Button type="submit" onClick={handleSubCategory}>Add</Button>
                          </div>
                          <ul className="border-bottom-solid-red">
                              {topics.length > 0 ? (
                                topics.map((value, index) => (
                                  <li style={{ borderBottom: '0.5px solid gray' }} key={index}> {value} </li>
                                ))
                              ) : (
                                <li>No sub-category</li>
                              )}
                          </ul>
                     </div>
                    </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                       <Button onClick={()=>navigate("/admin/category")}>Back</Button>
                       <Button type="submit">Add Category</Button>
                    </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
</div>
  )
}

export default AdminCategory
