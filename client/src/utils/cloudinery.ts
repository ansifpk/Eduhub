// import {v2 as cloudinary} from "cloudinary"

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_KEY,
//   api_secret: process.env.CLOUD_SECRET,
// });

// // Upload a video
// export const uploadVideos = async (videoPath:File) => {
//   try {
//     const result = await cloudinary.uploader.upload(videoPath.name, {
//       resource_type: "video",
//       folder: "eduhubvideos", 
//     });
//     return result;
//   } catch (error) {
//     console.error("Error uploading video:", error);
//     throw error;
//   }
// };