import cloudinary  from 'cloudinary'
// CLOUD_NAME= 
// CLOUD_KEY=
// CLOUD_SECRET=
cloudinary.v2.config({
    cloud_name:"dbkyg0ds3",
    api_key:"544564292734566",
    api_secret:"G3J3SeplgcAAXiSbcRhg9Ql_pqQ"
})
export type Icloudinary =typeof cloudinary;
export default cloudinary;