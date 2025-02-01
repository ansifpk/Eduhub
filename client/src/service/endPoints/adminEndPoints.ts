const adminRoutes = {
    login:'/auth/admin/login',
    category:'/category/admin/category',
    addCategory:'/category/admin/addCategory',
    editCategory:'/category/admin/editCategory',
    listCategory:'/category/admin/listCategory',
    students:'/profile/admin/students',
    blockUse:'/auth/admin/blockUser',
    instructors:'/profile/admin/instructors',
    instructorAprovel:'/profile/admin/instructorAprovel',
    blockInstructor:'/auth/admin/blockinstructor',
    editProfile:"/admin/editProfile",
    getCourses:"/course/admin/getCourses",
    course:"/course/admin/course",
    logout:'/admin/logout',
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
     //*top5Instructors
     top5Instructors:"/profile/admin/top5Instructors",

   }

   
   export default adminRoutes