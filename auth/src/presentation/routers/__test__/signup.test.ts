import request from 'supertest';
import { app } from '../../app';

it("reqtuen a success signup",async()=>{
    return request(app)
    .post('/auth/user/register')
    .send({
        email:"testlatest@gmail.com",
        password:'12345678',
        name:"balan"
    })
    .expect(200);
})