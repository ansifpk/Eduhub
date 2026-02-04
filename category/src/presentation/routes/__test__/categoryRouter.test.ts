import { app } from "../../../app";
import request from "supertest";

it("returns 200 for fetching all categry", async () => {
  await request(app).get("/category/admin/category").expect(200);
});

it("returns 400 for creating a existing categry", async() => {
  await request(app)
    .post("/category/admin/addCategory")
    .send({
      title: 'humanities',
      description: "hello this is an category for humanities",
      topics: ['sociel',"politics","accounting"],
    })
    .expect(201);
  await request(app)
    .post("/category/admin/addCategory")
    .send({
      title: 'humanities',
      description: "hello this is an category for humanities",
      topics: ['sociel',"politics","accounting"],
    })
    .expect(400);
});

it("returns 400 for creating a new categry with no topic", async() => {
  await request(app)
    .post("/category/admin/addCategory")
    .send({
      title: 'humanities',
      description: "hello this is an category for humanities",
    })
    .expect(400);
});
it("returns 400 for creating a new categry with no description", async() => {
  await request(app)
    .post("/category/admin/addCategory")
    .send({
      title: 'humanities',
      topics: ['sociel',"politics","accounting"],
    })
    .expect(400);
});

it("returns 201 for creating a new categry", async() => {
  await request(app)
    .post("/category/admin/addCategory")
    .send({
      title: 'humanities',
      description: "hello this is an category for humanities",
      topics: ['sociel',"politics","accounting"],
    })
    .expect(201);
});

it("returns 200 for editing a existing categry", async() => {
   const res =  await request(app)
    .post("/category/admin/addCategory")
    .send({
      title: 'humanities',
      description: "hello this is an category for humanities",
      topics: ['sociel',"politics","accounting"],
    })
    .expect(201);
    
  await request(app)
    .patch("/category/admin/editCategory")
    .send({
      title: 'humanities',
      description: "hello this is an category for humanities",
      topics: ['sociel',"politics","accounting"],
      _id:res.body.data._id
    })
    .expect(200);
});

it("returns 400 for editing when categry bot found", async() => {
   await request(app)
    .post("/category/admin/addCategory")
    .send({
      title: 'humanities',
      description: "hello this is an category for humanities",
      topics: ['sociel',"politics","accounting"],
    })
    .expect(201);
    
  await request(app)
    .patch("/category/admin/editCategory")
    .send({
      title: 'humanities',
      description: "hello this is an category for humanities",
      topics: ['sociel',"politics","accounting"],
      _id:"123"
    })
    .expect(400);
});

it("returns 400 for editing when the categry is already exist", async() => {
   const res =  await request(app)
    .post("/category/admin/addCategory")
    .send({
      title: 'humanities',
      description: "hello this is an category for humanities",
      topics: ['sociel',"politics","accounting"],
    })
    .expect(201);

   await request(app)
    .post("/category/admin/addCategory")
    .send({
      title: 'web development',
      description: "hello this is an category for web development",
      topics: ['sociel',"politics","accounting"],
    })
    .expect(201);
    
  await request(app)
    .patch("/category/admin/editCategory")
    .send({
      title: 'web development',
      description: "hello this is an category for web development",
      topics: ['sociel',"politics","accounting"],
      _id:res.body.data._id
    })
    .expect(400);
});
