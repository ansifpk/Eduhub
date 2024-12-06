
import { ApiSection, CourseData } from "@/@types/mainCourse";
import Api from "@/service/axios";
import { axInstence } from "@/service/client";
import instructorRoutes from "@/service/endPoints/instructorEndPoints";
import imageCompression from 'browser-image-compression'
 
// import { File } from "buffer";
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
  
interface Iuser {
    email:string,
    name:string,
    qualification:string,
    experience:string,
    cv:{
        id:string,
        cv_url:string|File
    },
    certificate:{
        id:string,
        certificate_url:string|File
    }   
 }
export const editProfile = async (instructorData:object) =>{
    try {
       
        const response = await Api.patch(instructorRoutes.editProfile,instructorData);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const register = async (instructorData:Iuser) =>{
    try {

       
         const formData = new FormData()
         formData.append("name",instructorData.name)
         formData.append("email",instructorData.email)
         formData.append("qualification",instructorData.qualification)
         formData.append("experience",instructorData.experience)

        const img1 = instructorData.certificate.certificate_url as File
        const img2 = instructorData.cv.cv_url as File
        formData.append("certificate",img1.name)
        formData.append("cv",img2.name)
        if (instructorData.certificate.certificate_url instanceof File) {
            const newCertificate = await imageCompression(instructorData.certificate.certificate_url, { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true })
            // console.log(newCertificate);
            formData.append("certificateImage",newCertificate)
            
          }
          
          if (instructorData.cv.cv_url instanceof File) {
            const newCv = await imageCompression(instructorData.cv.cv_url, { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true })
          
            formData.append("cvImage",newCv)
          }
        //  formData.append("certificateImage",instructorData.certificate.certificate_url)
        //  formData.append("cvImage",instructorData.cv.cv_url)

          console.log("nc");
          
         const response = await axInstence.patch(instructorRoutes.register,formData,{
            headers:{
                'Content-Type':"multipart/form-data"
            }
         })
       return response.data;
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
        const response = await axInstence.get(`${instructorRoutes.getCategoryies}`);       
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
   
        
        const response = await axInstence.post(instructorRoutes.createCourse,formData,{
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
        const response = await axInstence.get(`${instructorRoutes.getCourses}/${instructorId}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
export const allCourses = async()=>{
    try {
        const response = await axInstence.get(`${instructorRoutes.allCourses}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
export const listCourses = async(courseId:string)=>{
    try {
        const response = await axInstence.patch(`${instructorRoutes.listCourses}/${courseId}`);
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
        const response = await axInstence.get(instructorRoutes.orders);       
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
        
        const response = await axInstence.patch(`${instructorRoutes.editCourse}`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}
