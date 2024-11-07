import AdminAside from '@/Components/admin/AdminAside'
import { Card,CardContent,CardHeader } from '@/Components/ui/card';
import React, {  useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Button } from '@/Components/ui/button';
import toast from 'react-hot-toast';
import {  category, editCategory } from '@/Api/admin';

interface ICategory{
    _id?:string;
    title:string;
    description:string;
    topic?:string[];
}

const EditCategory:React.FC = () => {
    const [topics,setTopics] = useState<string[]>([])
    const [subCategory,setsubCategory] = useState('')
    const [title,setTitle] = useState("")
    const [description,setDiscription] = useState("")
    // const [Category,setCategory] = useState<ICategory | undefined>()

    const navigate = useNavigate();
    const {id} = useParams()
    useEffect(()=>{
        const fetchAllCategories = async () => {
            const response = await category();
            if(response){
               const data =  response.filter((value:ICategory)=>value._id == id)
               const cate = data[0];
            setTitle(cate.title || title)
            setDiscription(cate.description||description)
            setTopics(cate.topics||topics)
               
            }else{
               return toast.error("Category Not Fount");
            }
        }
        fetchAllCategories()
      },[]);
    //   console.log("idh",Category)
    const handleSubCategory = async (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(subCategory.length==0){
          return ;
        }
        if(topics.length <8){
          setTopics((prevState)=>[...prevState,subCategory])
          setsubCategory("")
          toast.success("sub Category added")
        }else{
          setsubCategory("")
          toast.error("maximum limite exceeded")
        }
    }
    const removeCategory = async (index:number) => {
        setTopics((prevTopics) => prevTopics.filter((value,i) => i !== index));
        toast.success("sub Category removed")
    }
    const handleCategory = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const respose = await editCategory({_id:id,title,description,topics})
        console.log("edit cat",respose)
        if(respose.success){
          toast.success(" Category edited");
          return navigate("/admin/category")
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
                   <h2 className="text-lg font-semibold">Edit Category</h2>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCategory}>
                    <div  className='d-flex justify-content-between'>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                       <Label htmlFor="Title">Title</Label>
                       <Input type="text" value={ title} onChange={(e)=>setTitle(e.target.value)} id="Title" placeholder="Title" />

                       <Label htmlFor="Deacription">Deacription</Label>
                       <Textarea value={description } onChange={(e)=>setDiscription(e.target.value)} maxLength={100} placeholder="Add your Deacription here." />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                     <div>    
                          <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" value={subCategory} onChange={(e)=>setsubCategory(e.target.value.trim())} placeholder="Sub Categories" />
                            <Button type='button' onClick={handleSubCategory}>Add</Button>
                          </div>
                          <ul className="border-bottom-solid-red">
                              {topics.length > 0 ?(
                                topics.map((value, index) => (
                                  <li className='d-flex justify-content-between' style={{ borderBottom: '0.5px solid gray', }} key={index}> {value} <Button type="button" onClick={() => removeCategory(index)}>remove</Button></li>
                                ))
                              ) : (
                                <li>No sub-category</li>
                              )}
                          </ul>
                     </div>
                    </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                       <Button type='button' onClick={()=>navigate("/admin/category")}>Back</Button>
                       <Button type="submit">Edit Category</Button>
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

export default EditCategory
