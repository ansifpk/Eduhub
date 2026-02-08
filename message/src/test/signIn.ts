import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { userModel } from "../infrastructure/db/modals/userModel";


const signIn = async () => {
   // build a jwt paulod {id,email}
  
  await userModel.create({_id: "69862dc0a2e2c765ce15357d",
       name: "ansif",
       email: "ansifpk@gmail.com",
       isInstructor: true,
       isBlock: false,
       isAdmin: true, 
       createdAt: new Date(),
       avatar: { 
        id: "1",
        avatar_url: "string"
       }
    });



   const payload = {
    id: "69862dc0a2e2c765ce15357d",
   }

   // cretae the jwt 
   const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESSKEY!,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESHKEY!,
    { expiresIn: '30d' }
  );

  // return a string thats the cokie with the encoded data 
    return [
    `accessToken=${accessToken}`,
    `refreshToken=${refreshToken}`
    ];
}


export { signIn };
