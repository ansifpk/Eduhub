const adminRoutes = {
  //*auth
    login:'/auth/auth/admin/login',
    blockUser:'/auth/auth/admin/blockUser',
    blockInstructor:'/auth/auth/admin/blockinstructor',
    logout:'/auth/auth/admin/logout',
    tocken:"/auth/auth/admin/refresh-token",
    //*category
    category:'/category/category/admin/category',
    addCategory:'/category/category/admin/addCategory',
    editCategory:'/category/category/admin/editCategory',
    listCategory:'/category/category/admin/listCategory',
    //*profile
    students:'/profile/profile/admin/students',
    instructors:'/profile/profile/admin/instructors',
    instructorAprovel:'/profile/profile/admin/instructorAprovel',

     //*course
    getCourses:"/course/course/admin/getCourses",
    course:"/course/course/admin/course",
    editProfile:"/editProfile",
    coupon:'/course/course/admin/coupon',
    report:'/course/course/admin/report',
    top5RatedCourse:'/course/course/admin/top5Course',
     //!message
     message:"/message/message/message",
     notification:"/message/message/notification",
     //chat
    chat:"/message/message/chat",
    privetChat:"/message/message/chat/privetChat",
     //*subscription
     subscription:"/purchase/purchase/admin/subscription",
     //*salesReports
     salesReports:"/purchase/purchase/admin/salesReports",
     //*order
     order:"/purchase/purchase/admin/order",
     getOrders:"/purchase/purchase/admin/getOrders",
    //  filterChart:"/purchase/purchase/admin/filterChart",
     //*top5Instructors
     top5Instructors:"/profile/profile/admin/top5Instructors",
     instructorRequest:"/profile/profile/admin/instructorRequest",
   }

   
   export default adminRoutes