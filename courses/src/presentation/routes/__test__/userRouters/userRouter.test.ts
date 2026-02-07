import request from "supertest";
import { app } from "../../../../app";


it("returns 200 for fetching all courses", async () => {
  await request(app)
  .get(`/course/admin/courses?category=""&&level=""&&topic=""&&search=""&&sort=""&&page="1"`)
  .expect(200);
});