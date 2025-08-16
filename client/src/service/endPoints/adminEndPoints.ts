const adminRoutes = {
  //*auth
    login:'/auth/auth/admin/login',
    blockUser:'/auth/admin/blockUser',
    blockInstructor:'/auth/admin/blockinstructor',
    logout:'/auth/auth/admin/logout',
    tocken:"/auth/auth/admin/refresh-token",
    //*category
    category:'/category/admin/category',
    addCategory:'/category/admin/addCategory',
    editCategory:'/category/admin/editCategory',
    listCategory:'/category/admin/listCategory',
    //*profile
    students:'/profile/admin/students',
    instructors:'/profile/profile/admin/instructors',
    instructorAprovel:'/profile/profile/admin/instructorAprovel',
    top5Instructors:"/profile/admin/top5Instructors",
    instructorRequest:"/profile/profile/admin/instructorRequest",

     //*course
    getCourses:"/course/admin/getCourses",
    course:"/course/admin/course",
    coupon:'/course/admin/coupon',
    report:'/course/admin/report',
    top5RatedCourse:'/course/admin/top5Course',
     //!message
     message:"/message/message",
     notification:"/message/notification",
    chat:"/message/chat",
    privetChat:"/message/chat/privetChat",
     //*purchase
     order:"/purchase/admin/order",
     subscription:"/purchase/admin/subscription",
     getOrders:"/purchase/admin/getOrders",
     salesReports:"/purchase/admin/salesReports",

   }

   
   export default adminRoutes