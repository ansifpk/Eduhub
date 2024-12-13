import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({storage:storage,limits:{
  fileSize: 50 * 1024 * 1024 
}});
export default upload.fields([
  { name: 'courseImage', maxCount: 1 },  
  { name: 'courseVideo', maxCount:50 }  
])
