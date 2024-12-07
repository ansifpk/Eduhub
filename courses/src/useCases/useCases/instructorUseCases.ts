import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ICourse } from "../../entities/course";
import { IInstructorrepository } from "../interfaces/repository/IInstructorRepository";
import { IRandomName } from "../interfaces/service/IrandomName";
import { IS3bucket } from "../interfaces/service/Is3bucket";
import { IInstructorUseCase } from "../interfaces/useCases/IInstructorUseCase";
import { NextFunction } from "express";
import ErrorHandler from "../middlewares/errorHandler";
import { ICloudinary } from "../interfaces/service/Icloudinery";
interface FileData {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
interface example {
  _id: string;
  title: string;
  instructorId: string;
  subCategory: string;
  description: string;
  thumbnail: string;
  category: string;
  level: string;
  isListed: boolean;
  price: number;
  test: [];
  subscription: boolean;
  videos: string[];
  image: string;
  imageUrl: string;
  videoUrl: string[];
  createdAt: string;
}
interface Course {
  _id?: string;
  title: string;
  instructorId?: string;
  subCategory: string;
  description: string;
  thumbnail: string;
  category: string;
  level: string;
  isListed: boolean;
  price: number;
  test?: [];
  subscription: boolean;
  videos: string[];
  image: string;
  imageUrl: string;
  videoUrl: string[];
  createdAt: string;
}
interface Req {
  bodyData: ICourse;
  fileData: {
    courseVideo?: FileData[];
    courseImage?: FileData[];
  };
}

export class InstructorUseCase implements IInstructorUseCase {
  constructor(
    private instructorRepository: IInstructorrepository,
    private bcrypt: IRandomName,
    private s3bucketrepository: IS3bucket,
    private cloudinery: ICloudinary
  ) {}
  async fetchCourses(instructorId: string): Promise<ICourse[] | void> {
      try {
         const courses = await this.instructorRepository.find(instructorId);
         if(courses){
          return courses
         }
      } catch (error) {
        console.error(error)
      }
  }
  async allCourses(next:NextFunction): Promise<ICourse[] | void> {
      try {
         const courses = await this.instructorRepository.get();
         if(courses){
          return courses
         }
      } catch (error) {
        console.error(error)
      }
  }
  async createCourse(courseData: Req): Promise<ICourse | void> {
    courseData.bodyData.image = JSON.parse(
      courseData.bodyData.image as unknown as string
    );
      courseData.bodyData.sessions = JSON.parse(
      courseData.bodyData.sessions as unknown as string
    );
    const files = courseData.fileData as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
     
    if(files){
      for(let key in files){
        if(key == "courseImage"){
          const data = await this.cloudinery.addFile(files[key][0]); 
          if(data){    
            courseData.bodyData.image.image_url = data.secure_url!
            courseData.bodyData.image._id = data.public_id!
          }
        }else{
          
          for(let value of files[key]){
            let sectionIdx = parseInt(value.originalname.slice(7,8))
            let lectureIdx = parseInt(value.originalname.slice(16,17))
            const data = await this.cloudinery.addFile(value);
            if(data){
              courseData.bodyData.sessions[sectionIdx].lectures[lectureIdx].content._id = data.public_id
              courseData.bodyData.sessions[sectionIdx].lectures[lectureIdx].content.video_url = data.secure_url
            }
            
          }
         
        }
        
      }
      const course = await this.instructorRepository.create(courseData.bodyData)
      if(course){
        console.log(course);
        return course;
      }
      
    }

  }
  async editCourse(courseData: object, next: NextFunction): Promise<ICourse | void> {
    
  }
  async listCourse(courseId: string, next: NextFunction): Promise<ICourse | void> {
    
    const course = await this.instructorRepository.findById(courseId);
   
    if(!course){
     return next(new ErrorHandler(400,"Course Not fount"))
    }
    
    const listedCourse = await this.instructorRepository.list(courseId,course.isListed)
    if(listedCourse){
       return listedCourse
    }
   
  }


  // async fetchCourses(instructorId: string): Promise<ICourse[] | void> {
  //   const courses = await this.instructorRepository.find(instructorId)
  //   if(courses){
       
  //       for(let i=0;i<courses.length;i++){
  //           const objectParams = {
  //               Key:courses[i].image
  //           }
  //           const url =  await this.s3bucketrepository.getGallery(objectParams);
  //           if(url){
  //               courses[i].image = url;
  //           }
  //       }

  //       return courses
        
  //   }
  // }

  // async createCourse(courseData: Req): Promise<ICourse | void> {

  //   courseData.bodyData.sessions = JSON.parse(
  //     courseData.bodyData.sessions as unknown as string
  //   );
  //   const files = courseData.fileData as
  //     | { [fieldname: string]: Express.Multer.File[] }
  //     | undefined;
  //   if (files && courseData.bodyData) {
  //       let command;
  //     for (let key in files) {
  //       command=null;
  //       if (key == "courseImage") {
  //         const galleryName = await this.bcrypt.createName();
  //         command = await this.s3bucketrepository.putGallery({
  //           Key: galleryName,
  //           Body: files[key][0].buffer,
  //           ContentType: files[key][0].mimetype,
  //         });
  //         courseData.bodyData.image = galleryName;
  //       } else {
  //         for (let videos of files[key]) {
  //           const galleryName = await this.bcrypt.createName();
  //           let sectionIdx = parseInt(videos.originalname.slice(0, 8).at(-1)!);
  //           let lectureIdx = parseInt(videos.originalname.slice(8, 17).at(-1)!);
  //           courseData.bodyData.sessions[sectionIdx].lectures[
  //             lectureIdx
  //           ].content = galleryName;
           
  //           command = await this.s3bucketrepository.putGallery({
  //             Key: galleryName,
  //             Body: videos.buffer,
  //             ContentType: videos.mimetype,
  //           });
          
  //         }
  //       }
  //     }
  //     if(command){   
  //         const course = await this.instructorRepository.create(courseData.bodyData);
  //         if(course){
  //           return course;
  //         }
  //     }
  //   }
  // }

  // async editCourse(courseData: Req): Promise<ICourse | void> {
  //   // console.log(courseData.fileData,"usecase");
  //   // let image:string = '';
  //   // let videos: string[] = [];
  //   // const files = courseData.fileData  as { [fieldname: string]: Express.Multer.File[] } | undefined;
  //   // if(files){
  //   //     for(let key in files){
  //   //         if(files[key]){
  //   //             let command
  //   //             // console.log(files[key],"idh",key);
  //   //             const galleryName = await this.bcrypt.createName();
  //   //             if(key === "courseVideo" ){
  //   //                 for(let i=0;i<files[key].length;i++){
  //   //                     const objectParams = {
  //   //                         Key:files[key][i].originalname
  //   //                        }
  //   //                        const checkGallery =  await this.s3bucketrepository.checkGallery(objectParams)
  //   //                        if(checkGallery){
  //   //                         videos[i]=files[key][i].originalname;
  //   //                     }else{
  //   //                          videos[i] = `${galleryName}${i}`;
  //   //                          await this.s3bucketrepository.putGallery({Key:`${galleryName}${i}`,Body:files[key][i].buffer,ContentType:files[key][i].mimetype})
  //   //                      }
  //   //                     }
  //   //             }else{
  //   //                 const objectParams = {
  //   //                     Key:files[key][0].originalname
  //   //                 }
  //   //                 const checkGallery = await this.s3bucketrepository.checkGallery(objectParams)
  //   //                 // const galleryName = await this.bcrypt.createName();
  //   //                 if(checkGallery){
  //   //                     // console.log("ind imag",files[key][0].originalname);
  //   //                     image = files[key][0].originalname;
  //   //                 }else{
  //   //                     // console.log("illa imag",files[key][0].originalname);
  //   //                     command =  await this.s3bucketrepository.putGallery({Key:galleryName,Body:files[key][0].buffer,ContentType:files[key][0].mimetype})
  //   //                     image = galleryName;
  //   //                 }
  //   //             }
  //   //         //    console.log("1",image,videos);
  //   //         }
  //   //     }
  //   //     if(image!&&videos.length>0){
  //   //         // console.log(image!,"imaagggggg",videos,"videooosss");
  //   //         courseData.bodyData.image = image
  //   //         courseData.bodyData.videos = videos
  //   //         console.log("before",courseData.bodyData);
  //   //         const course = await this.instructorRepository.edit(courseData.bodyData);
  //   //         // console.log(course,"ju");
  //   //         if(course){
  //   //         //     console.log("backto ciontroller");
  //   //             return course;
  //   //         }
  //   //      }else{
  //   //         console.log("illa",image!,"imaagggggg",videos,"videooosss");
  //   //      }
  //   // }
  // }
  // async listCourse(
  //   courseId: string,
  //   next: NextFunction
  // ): Promise<ICourse | void> {
  //   const course = await this.instructorRepository.findById(courseId);
  //   if (course) {
  //     const listCourse = await this.instructorRepository.list(course);
  //     return listCourse;
  //   } else {
  //     return next(new ErrorHandler(400, "Course Not Exists.."));
  //   }

  //   throw new Error("Method not implemented.");
  // }
}
