import { app } from "../../../../app";
import { adminSignIn } from "../../../../test/signIn";
import request from 'supertest';

it("returns 200 after finding all instructors", async () => {
    const token = await adminSignIn();   
  await request(app)
  .get(`/profile/admin/instructors?search=""&&sort=""&&page=1`)
  .set("Cookie",token)
  .expect(200);
});