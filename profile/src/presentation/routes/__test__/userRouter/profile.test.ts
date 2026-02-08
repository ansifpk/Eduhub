import { app } from "../../../../app";
import { signIn } from "../../../../test/signIn";
import request from 'supertest';

it("returns 200 after finding user profile", async () => {
    const token = await signIn();   
  await request(app)
  .get(`/profile/user/profile?userId=69862dc0a2e2c765ce15357d`)
  .set("Cookie",token)
  .expect(200);
});