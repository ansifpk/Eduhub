import { app } from "../../../../app";
import { adminSignIn } from "../../../../test/signIn";
import request from 'supertest';

jest.mock("stripe");
it("returns 200 after finding user profile", async () => {
  const token = await adminSignIn();   
  await request(app)
  .get(`/purchase/admin/getOrders/01-01-2025/01-01-2026`)
  .set("Cookie",token)
  .expect(200);
});