import ApiGatway from "../service/axios";
import instructorRoutes from "../service/endPoints/instructorEndPoints";
// import imageCompression from 'browser-image-compression'
 

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
       
        const response = await ApiGatway.patch(instructorRoutes.editProfile,instructorData);       
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
            const newCertificate = instructorData.certificate.certificate_url
            formData.append("certificateImage",newCertificate)
            
          }
          
          if (instructorData.cv.cv_url instanceof File) {
            const newCv = instructorData.cv.cv_url

            formData.append("cvImage",newCv)
          }

         const response = await ApiGatway.patch(instructorRoutes.register,formData,{
            headers:{
                'Content-Type':"multipart/form-data"
            },
            withCredentials:true
         })
       return response.data;
    } catch (error) {
        return error 
    }
}
export const currentUser = async (userId:string) =>{
    try {
     

        const response = await ApiGatway.get(`${instructorRoutes.currentUser}/${userId}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const getCategoryies = async () =>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.getCategoryies}`);       
        return response.data
    } catch (error) {
        return error 
    }
}
export const createCourse = async (data:object) =>{
    try {
        const response = await ApiGatway.post(instructorRoutes.createCourse,data,{
            headers:{
                'Content-Type':"multipart/form-data"
            }
        });       
        return response.data
    } catch (error) {
        return error 
    }
}

export const getCourses = async(instructorId:string,search:string="",sort:string="")=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.getCourses}?instructorId=${instructorId}&&search=${search}&&sort=${sort}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
export const uploadVideo = async(data:object)=>{
    try {
        const response = await ApiGatway.post(instructorRoutes.uploadVideo,data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const loginInstructor = async (password:string,email:string) =>{
    try {
        const response = await ApiGatway.post(instructorRoutes.login,{password,email});       
        return response.data
    } catch (error) {
        return error 
    }
}

export const logoutInstructor = async () =>{
    try {
        const response = await ApiGatway.post(instructorRoutes.logout);
        return response.data
    } catch (error) {
        return error 
    }
}

export const allCourses = async()=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.allCourses}`);
        return response.data;
    } catch (error) {
        return error;
    }
}
export const listCourses = async(courseId:string)=>{
    try {
        const response = await ApiGatway.patch(`${instructorRoutes.listCourses}/${courseId}`);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const addTestToCourse = async(testData:object,courseId:string)=>{
    try {
        const response = await ApiGatway.post(`${instructorRoutes.tests}/${courseId}`,{testData});
        return response.data;
    } catch (error) {
        return error;
    }
}

export const editTestToCourse = async(testData:object,testId:string)=>{
    try {
        const response = await ApiGatway.patch(`${instructorRoutes.tests}/${testId}`,{testData});
        return response.data;
    } catch (error) {
        return error;
    }
}

export const tockenInstructor = async () => {
    try {
        const response = await ApiGatway.post(instructorRoutes.tocken);
        return response.data
    } catch (error) {
        return error 
    }
}

export const editCourse = async(courseData:object)=>{
    try {
        
        const response = await ApiGatway.patch(`${instructorRoutes.editCourse}`,courseData,{
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const instructorSendMessage = async(chatId:string,senderId:string,text:string)=>{
    try {
        const response = await ApiGatway.post(instructorRoutes.message,{chatId,senderId,text});
        return response.data
    } catch (error) {
        return error 
    }
}
export const instructorChats = async(userId:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.chat}?userId=${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const getInstructorMessages = async(chatId:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.message}/${chatId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const getInstructorCurrentChat = async(chatId:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.privetChat}/${chatId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const getSubscriptions = async()=>{
    try {
        const response = await ApiGatway.get(instructorRoutes.subscription);
        return response.data
    } catch (error) {
        return error 
    }
}

export const getInstructorSubscriptions = async(userId:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.subscription}/${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const purchaseSubscription = async(method:string,userId:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.subscribe}/${method}/${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const instructorPlans = async(userId:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.subscribe}/${userId}`);    
        return response.data
    } catch (error) {
        return error 
    }
}
export const viewDetailes = async(customerId:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.customer}/${customerId}`);    
        return response.data
    } catch (error) {
        return error 
    }
}

export const createSubscription = async(userId:string,price:number,plan:string,description:string[])=>{
    try {
        const response = await ApiGatway.post(`${instructorRoutes.subscription}/${userId}`,{price,plan,description});    
        return response.data
    } catch (error) {
        return error 
    }
}

export const editSubscription = async(subscriptionId:string,price:number)=>{
    try {
        const response = await ApiGatway.patch(`${instructorRoutes.subscription}/${subscriptionId}`,{price});    
        return response.data
    } catch (error) {
        return error 
    }
}

export const getSalesReports = async (instructorId:string,report:string,year:string,month:number)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.order}?userId=${instructorId}&&report=${report}&&year=${year}&&month=${month}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const createReport = async (instructorId:string,report:string,year:string,month:number)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.salesReports}?userId=${instructorId}&&report=${report}&&year=${year}&&month=${month}`,{responseType:'blob'});
        return response.data
    } catch (error) {
        return error 
    }
}

export const sendNotification = async(recipientId:string,senderId:string)=>{
    try {
        const response = await ApiGatway.post(instructorRoutes.notification,{recipientId,senderId});
        return response.data
    } catch (error) {
        return error 
    }
}
export const getNotifications = async(recipientId:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.notification}/${recipientId}`);
        return response.data
    } catch (error) {
        return error 
    }
}

export const getOrders = async(userId:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.order}/${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const getTop5Courses = async(userId:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.top5Courses}/${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const getTop5RatedCourses = async(userId:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.top5RatedCourses}/${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const getRecentRatings = async(userId:string)=>{
    try {
        const response = await ApiGatway.get(`${instructorRoutes.ratings}/${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const markAsReadNotification = async (senderId:string,userId:string)=>{
    try {
        const response = await ApiGatway.patch(`${instructorRoutes.notification}/${userId}/${senderId}`);
        return response.data
    } catch (error) {
        return error 
    }
}
export const setLastSeen = async (userId:string)=>{
    try {
        const response = await ApiGatway.patch(`${instructorRoutes.chat}/${userId}`);
        return response.data
    } catch (error) {
        return error 
    }
}



