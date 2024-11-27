
import { ApiSection, CourseData } from "@/@types/mainCourse";
import Api from "@/service/axios";
import ApiCategory from "@/service/category";
import ApiCourse from "@/service/course";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import ApiOrder from "@/service/order";
import { useForm } from "react-hook-form";

// interface Section {
//     id: number;
//     sessionTitle: string;
//     isExpanded: boolean;
//     lectures: Lecture[];
//   }
  
//   interface Lecture {
//     id: number;
//     title: string;
//     content: {
//         _id:string,
//         video_url: File | string;
//     }
//     duration: string;
//     type: string;
//   }
  
// interface ApiSection {
//     id: number;
//     sessionTitle: string;
//     isExpanded: boolean;
//     lectures: ApiLecture[];
//   }
  
//   interface ApiLecture {
//     id: number;
//     title: string;
//     content: {
//         _id:string,
//         video_url: string | null;
//     }|null
//     duration: string;
//     type: string;
//   }
  
//   interface CourseData {
//     title: string;
//     sections: Section[];
//     image: File | undefined;
//     instructorId: string;
//     category: string;
//     description: string;
//     thumbnail: string;
//     subCategory: string;
//     level: string;
//     price: number;
//   }
export const editProfile = async (instructorData:object) =>{
    try {
       
        const response = await Api.patch(instructorRoutes.editProfile,instructorData);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const register = async (instructorData:object) =>{
    try {
        const response = await Api.post(instructorRoutes.register,instructorData);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const currentUser = async (userId:string) =>{
    try {
        const response = await Api.get(`${instructorRoutes.currentUser}/${userId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const getCategoryies = async () =>{
    try {
        const response = await ApiCategory.get(`${instructorRoutes.getCategoryies}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const createCourse = async (courseData:CourseData) =>{
    try {
      
        const formData = new FormData();
    
        
        formData.append('title', courseData.title);
        formData.append('category', courseData.category);
        formData.append('subCategory', courseData.subCategory);
        formData.append('level', courseData.level);
        formData.append('thumbnail', courseData.thumbnail);
        formData.append('description', courseData.description);
        formData.append('price', courseData.price.toString());
        formData.append('instructorId', courseData.instructorId);
        formData.append('courseImage', courseData.image.image_url);

        const img = courseData.image.image_url as File
       
       const obj =  {
        _id:courseData.image._id,
        image_url:img
        }

        formData.append('image',JSON.stringify(obj));



        const sectionsWithFiles: ApiSection[] = courseData.sections.map((session)=>{
            const lectures = session.lectures.map((lecture)=>({
                ...lecture,
                content:lecture.content?(lecture.content.video_url instanceof File 
                    ?{_id:lecture.content._id,video_url: lecture.content.video_url.name} 
                    : {_id:lecture.content._id,video_url: lecture.content.video_url}) : null
            }))
            return {...session , lectures}
        });
        
        formData.append('sessions',JSON.stringify(sectionsWithFiles));
        
        courseData.sections.map((session,index)=>{
            session.lectures.map((lecture,ind)=>{
                if(lecture.content){
                    let data = lecture.content.video_url as File
                    formData.append(
                        'courseVideo', 
                        data,
                        `section${index}_lecture${ind}_${data.name}`
                      );
                }
            })
        })
   
        
        const response = await ApiCourse.post(instructorRoutes.createCourse,formData,{
            headers:{
                'Content-Type':"multipart/form-data"
            }
        });       
        return response.data
    } catch (error) {
        return error 
    }
}

export const getCourses = async(instructorId:string)=>{
    try {
        const response = await ApiCourse.get(`${instructorRoutes.getCourses}/${instructorId}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
export const allCourses = async()=>{
    try {
        const response = await ApiCourse.get(`${instructorRoutes.allCourses}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
export const listCourses = async(courseId:string)=>{
    try {
        const response = await ApiCourse.patch(`${instructorRoutes.listCourses}/${courseId}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
export const getStudents = async () =>{
    try {
        const response = await Api.get(instructorRoutes.getStudents);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const orders = async () =>{
    try {
        const response = await ApiOrder.get(instructorRoutes.orders);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const editCourse = async(courseData:{_id:string,title:string,thumbnail:string,description:string,category:string,subCategory:string,level:string,price:number,image:File|string,video:File[]})=>{
    try {
        // console.log("sd",courseData);
        const formData = new FormData();
        if (courseData.video) {
            courseData.video.forEach((videoFile, index) => {
              formData.append('courseVideo', videoFile);  
            });
          }
        if(courseData.image){
            formData.append('courseImage', courseData.image);
        }
        formData.append("_id",courseData._id)
        formData.append("title",courseData.title)
        formData.append("thumbnail",courseData.thumbnail)
        formData.append("description",courseData.description)
        formData.append("category",courseData.category)
        formData.append("subCategory",courseData.subCategory)
        formData.append("level",courseData.level)
        formData.append("price",courseData.price.toString())
        
        const response = await ApiCourse.patch(`${instructorRoutes.editCourse}`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}
