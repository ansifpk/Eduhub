const adminRoutes = {
    login:'/auth/auth/admin/login',
    category:'/category/category/admin/category',
    addCategory:'/category/category/admin/addCategory',
    editCategory:'/category/category/admin/editCategory',
    listCategory:'/category/category/admin/listCategory',
    students:'/profile/profile/admin/students',
    blockUser:'/auth/auth/admin/blockUser',
    instructors:'/profile/profile/admin/instructors',
    instructorAprovel:'/profile/profile/admin/instructorAprovel',
    blockInstructor:'/auth/auth/admin/blockinstructor',
    editProfile:"/admin/editProfile",
    getCourses:"/course/course/admin/getCourses",
    course:"/course/course/admin/course",
    logout:'/admin/logout',
    coupon:'/course/course/admin/coupon',
    report:'/course/course/admin/report',
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
     //*top5Instructors
     top5Instructors:"/profile/profile/admin/top5Instructors",

   }

   
   export default adminRoutes