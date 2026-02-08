import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { userModel } from "../infrastructure/db/modals/userModel";
const signIn = async () => {
    
 const user =  await userModel.create({
    _id:new mongoose.Types.ObjectId(),
    name: "Arjun Kumar",
    email: "example@gmail.com",
    avatar: {
      id: "avatar_12345",
      avatar_url: "https://cdn.example.com/avatars/arjun.png",
    },
    isInstructor: true,
    isAdmin: false,
    isBlock: false,
  });

  // build a jwt paulod {id,email}
  const payload = {
    id: user._id.toString(),
    email: "example@gmail.com",
  };

  // cretae the jwt
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESSKEY!);

  // return a string thats the cokie with the encoded data
  return [`accessToken=${accessToken}`];
};

export { signIn };
