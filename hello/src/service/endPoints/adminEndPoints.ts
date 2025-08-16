const adminRoutes = {
  //*auth
   
  
    login:'/auth/auth/admin/login',
    blockUser:'/auth/admin/blockUser',
    blockInstructor:'/auth/admin/blockinstructor',
    logout:'/auth/auth/admin/logout',
    tocken:"/auth/admin/refresh-token",
    //*category
    category:'/category/admin/category',
    addCategory:'/category/admin/addCategory',
    editCategory:'/category/admin/editCategory',
    listCategory:'/category/admin/listCategory',
    //*profile
    students:'/profile/admin/students',
    instructors:'/profile/admin/instructors',
    instructorAprovel:'/profile/profile/admin/instructorAprovel',

     //*course
    getCourses:"/course/admin/getCourses",
    course:"/course/admin/course",
    editProfile:"/editProfile",
    coupon:'/course/admin/coupon',
    report:'/course/admin/report',
    top5RatedCourse:'/course/admin/top5Course',
     //!message
     message:"/message/message",
     notification:"/message/notification",
     //chat
    chat:"/message/chat",
    privetChat:"/message/chat/privetChat",
     //*subscription
     subscription:"/purchase/admin/subscription",
     //*salesReports
     salesReports:"/purchase/admin/salesReports",
     //*order
     order:"/purchase/admin/order",
     getOrders:"/purchase/admin/getOrders",
    //  filterChart:"/purchase/admin/filterChart",
     //*top5Instructors
     top5Instructors:"/profile/admin/top5Instructors",
     instructorRequest:"/profile/profile/admin/instructorRequest",
   }

   
   export default adminRoutes