import request from "supertest";
import { httpServer } from "../../../../app";
import { signIn } from "../../../../test/signIn";


it("returns 200 for fetching all courses", async () => {
    const token = await signIn();
    console.log(token);
    
  await request(httpServer)
  .get(`/message/chat/`)
  .set("Cookie",token)
  .expect(200);
});