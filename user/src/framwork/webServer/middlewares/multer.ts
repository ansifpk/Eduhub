import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({storage:storage});
export default upload.fields([
  { name: 'certificateImage', maxCount: 1 },  
  { name: 'cvImage', maxCount: 1 }  
])
