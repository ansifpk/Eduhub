import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({storage:storage});
export default upload.fields([
  { name: 'courseImage', maxCount: 1 },  
  { name: 'courseVideo', maxCount: 10 }  
])
