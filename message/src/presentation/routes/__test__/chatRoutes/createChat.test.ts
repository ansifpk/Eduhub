import request from "supertest";
import { httpServer } from "../../../../app";
import { signIn } from "../../../../test/signIn";
import { userModel } from "../../../../infrastructure/db/modals/userModel";
import mongoose from "mongoose";

const createUser = async ()=> {
    return await userModel.create({_id: new mongoose.Types.ObjectId(),
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
}

it("returns 201 for creating a user chat", async () => {
    const token = await signIn();   
    const user = await createUser() 
  await request(httpServer)
  .post(`/message/chat`)
  .set("Cookie",token)
  .send({
    userId:"69862dc0a2e2c765ce15357d",
    recipientId:user._id,
    role:"userToInstructor"
  })
  .expect(201);
});

it("returns 200 after finding user chats", async () => {
    const token = await signIn();   
  await request(httpServer)
  .get(`/message/chat?userId=69862dc0a2e2c765ce15357d`)
  .set("Cookie",token)
  .expect(200);
});