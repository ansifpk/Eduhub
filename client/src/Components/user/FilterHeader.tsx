
import { Button } from '../ui/button';
import data from '../../assets/home-page/studnet.jpg'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { useEffect, useState } from 'react';
import { getCategoryies } from '@/Api/instructor';
import { ICategory } from '@/@types/categoryTpe';

const FilterHeader = () => {

  const [categories,setCategories] = useState([])
  const [topics,setTopics] = useState([])
  const [category,setCategory] = useState("")

  useEffect(()=>{
     const cate = async ()=>{
       const response = await getCategoryies();
       if(response){
        setCategories(response);
       }
     }
     cate();
  },[]);
console.log(categories);

  return (
    <div  style={{
      backgroundImage: `linear-gradient(
          rgba(73, 187, 189, 0.5),
      rgba(73, 187, 189, 0.5)
        ), url(${data})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat', // Prevent tiling of the image
    }} className="h-1/3  flex flex-wrap items-center justify-center gap-4 p-4 ">
      <div className="w-75 md:w-1/2 flex bg-white border rounded" >
      <input 
        type="text"
        className='m-1' 
        placeholder="Search courses here..." 
        aria-label="Search courses" 
      />
      <Button type='button' className='bg-[#49BBBD] text-white m-1'>Search</Button>
      </div>
      <div  className="w-3/4 md:w-1/2  grid auto-rows-min gap-4 md:grid-cols-3" >      
      <Select>
      <SelectTrigger >
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
           {categories.map((value:ICategory)=>(
            <SelectItem key={value._id} value={value.title}>{value.title}</SelectItem>
           ))}
          
        </SelectGroup>
      </SelectContent>
    </Select>
      <Select>
      <SelectTrigger >
        <SelectValue placeholder="Select a Topic" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Topic</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
      <Select>
      <SelectTrigger >
        <SelectValue placeholder="Sort courses" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>
    </div>
  );
};

export default FilterHeader;
