import request from 'supertest';
import { httpServer } from '../../../../app';


  it('returns 200 and sets cookie', async () => {
    await request(httpServer)
      .post('/auth/user/register')
      .send({
        name: 'test user',
        email: 'ansif3060@gmail.com',
        mobile:"1234567890",
        password: 'password'
      })
      .expect(200);
  });

it("return a 400 with an invalid email",async()=>{
    return request(httpServer)
    .post('/auth/user/register')
    .send({
        name:"ansif",
        mobile:"1234567890",
        email:"ansif3060@gmailcom",
        password:"password"
    })
    .expect(400);
});

it("return a 400 with an invalid password",async()=>{
    return request(httpServer)
    .post('/auth/user/register')
    .send({
        name:"ansif",
        mobile:"1234567890",
        email:"ansif3060@gmail.com",
        password:"pa"
    })
    .expect(400);
});

it("return a 400 with missing email and password",async()=>{
    await request(httpServer)
    .post('/auth/user/register')
    .send({
        name:"ansif",
        mobile:"1234567890",
        email:"ansif3060@gmail.com"
    })
    .expect(400);
    await request(httpServer)
    .post('/auth/user/register')
    .send({
       name:"ansif",
        mobile:"1234567890",
        password:"password"
    })
    .expect(400);
});


