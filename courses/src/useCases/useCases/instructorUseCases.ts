
import { ICourse } from "../../entities/course";
import { IInstructorrepository } from "../interfaces/repository/IInstructorRepository";
import { IRandomName } from "../interfaces/service/IrandomName";
import { IS3bucket } from "../interfaces/service/Is3bucket";
import { IInstructorUseCase } from "../interfaces/useCases/IInstructorUseCase";
import { NextFunction } from "express";
import ErrorHandler from "../middlewares/errorHandler";
import { ICloudinary } from "../interfaces/service/Icloudinery";
import { ISection } from "../../entities/section";
import { ISentEmail } from "../interfaces/service/ISentMail";
import { ITest } from "../../entities/test";
interface FileData {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}


interface Req {
  bodyData: ICourse;
  fileData: {
    courseVideo?: FileData[];
    courseImage?: FileData[];
  };
}
interface ReqUp {
  courseId:string,
  bodyData: ISection[];
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
    private cloudinery: ICloudinary,
    private sendMail: ISentEmail,
    
  ) {}
  async editTest(testId: string, testData: ITest, next: NextFunction): Promise<ITest | void> {
    try {
         const checkTest = await this.instructorRepository.findTest(testId);
         if(!checkTest){
          return next(new ErrorHandler(400,"Test not Found"));
         }
        
         const updatedTest = await this.instructorRepository.editTest(testId,testData) 
         if(updatedTest){
          return updatedTest;
         }
    } catch (error) {
     console.error(error)
    }
  }

 async addTest(courseId: string, testData: ITest, next: NextFunction): Promise<ITest | void> {
    try {
      console.log("add test");
      
      const course = await this.instructorRepository.findById(courseId);
      if(!course){
        return next(new ErrorHandler(400,"Course not Found"));
      }
      const test = await this.instructorRepository.creatTest(testData)
      if(test){
        const course = await this.instructorRepository.addTest(courseId,test._id)
        if(course){
          return test;
        }
      }
    } catch (error) {
      console.error(error)
    }
  }
  async editSection(sectionData: ReqUp, next: NextFunction): Promise<Boolean | void> {
      
      const files = sectionData.fileData as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;
   
      const course = await this.instructorRepository.findById(sectionData.courseId)
      if(course){
        if(files){
           for(let key in files){
             if(key == "courseVideo"){
              for(let i=0;i<files[key].length;i++){
                // console.log(files[key][i]);
                let sectionIdx = parseInt(files[key][i].originalname.slice(7,8))
                let lectureIdx = parseInt(files[key][i].originalname.slice(16,17))

               if(!isNaN(sectionIdx)&&!isNaN(lectureIdx)){
                const data = await this.cloudinery.addFile(files[key][i]);
                if(data){
                  sectionData.bodyData[sectionIdx].lectures[lectureIdx].content._id = data.public_id
                  sectionData.bodyData[sectionIdx].lectures[lectureIdx].content.video_url = data.secure_url
                }
               }
                
              }
             }
           }
console.log("sratr");

           for(let i=0 ; i<sectionData.bodyData.length;i++ ){
                 if(course.sections.includes(sectionData.bodyData[i]._id!)){
                  console.log(sectionData.bodyData[i]._id,"hu");
                  
                  }else{
                    // console.log(sectionData.bodyData[i],"first");
                    
                    const section = await this.instructorRepository.upload(sectionData.bodyData[i])
                    if(section){
                      
                     const course = await this.instructorRepository.addSecton(sectionData.courseId,section._id!)
                     if(course){
                       console.log(course,"success");
                     }
                    }
                 }
           
               
               
           }
           
           
           for(let i=0;i<sectionData.bodyData.length;i++){
              for(let j=0;j<sectionData.bodyData[i].lectures.length;j++){
                await this.instructorRepository.editSecton(sectionData.bodyData[i])
              }
           }
        }
      }
  }
  async uploadVideo(sectionData:ReqUp,next:NextFunction): Promise<Boolean | void> {
   try {
    const files = sectionData.fileData as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;
    sectionData.bodyData = JSON.parse(
      sectionData.bodyData as unknown as string
      );

    for(let key in files){
     
      if( key == "courseVideo" ){
        // console.log(files[key]);
        for(let value of files[key]){

          let sectionIdx = parseInt(value.originalname.slice(7,8))
          let lectureIdx = parseInt(value.originalname.slice(16,17))
          const data = await this.cloudinery.addFile(value);
          if(data){
            sectionData.bodyData[sectionIdx].lectures[lectureIdx].content._id = data.public_id
            sectionData.bodyData[sectionIdx].lectures[lectureIdx].content.video_url = data.secure_url
          }
        }
      }
    }
   
       for(let i=0;i<sectionData.bodyData.length;i++){
       const section =  await this.instructorRepository.upload(sectionData.bodyData[i])
       if(section){
        const course = await this.instructorRepository.addSecton(sectionData.courseId,section._id!)
       if(course){
         console.log(course,"success");
       }
        
      }
       }
       // send mail to instructor mail...
       const course = await this.instructorRepository.findById(sectionData.courseId);
       if(course){
          await this.sendMail.sentSuccessMailToVideoUploading("example.com",course.title)
       }
       
       return true
    
   } catch (error) {
    console.error(error)
   }
  }
  async fetchCourses(instructorId: string,search : string,sort:string): Promise<ICourse[] | void> {
      try {
         const courses = await this.instructorRepository.find(instructorId,search,sort);
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
  async createCourse(courseData: Req,next:NextFunction): Promise<ICourse | void> {

    const files = courseData.fileData as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
     
    if(files){
      for(let key in files){
        if(key == "courseImage"){
          const data = await this.cloudinery.addFile(files[key][0]); 
          if(data){    
            courseData.bodyData.image = {
              _id:data.public_id,
              image_url : data.secure_url
            }
          }
        }
      }
      
      
      const course = await this.instructorRepository.create(courseData.bodyData)
      if(course){
        return course;
      }
    }

  }
  async editCourse(courseData: Req, next: NextFunction): Promise<ICourse | void> {

        const checkCourse = await this.instructorRepository.findById(courseData.bodyData._id!)
        courseData.bodyData.image = JSON.parse(courseData.bodyData.image as unknown as string)
        if(!checkCourse){
          return next(new ErrorHandler(400,"Course not Found"))
        }

         const files = courseData.fileData as | { [fieldname: string]: Express.Multer.File[] } | undefined;
         
         if(files){
          for(let key in files){
            if(key == "courseImage"){
              const data = await this.cloudinery.addFile(files[key][0]); 
              if(data){    
                courseData.bodyData.image = {
                  _id:data.public_id,
                  image_url : data.secure_url
                }
              }
            }
          }
     
  
          courseData.bodyData.sections = JSON.parse(courseData.bodyData.sections as unknown as string)
     
          
         const course = await this.instructorRepository.edit(courseData.bodyData)
          if(course){
            return course;
          }

        
         }
 
 
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
}
