import request from 'supertest';
import { httpServer } from '../../app';

it("reqtuen a success signup",async()=>{
    return request(httpServer)
    .post('/auth/user/register')
    .send({
        email:"testlatest@gmail.com",
        password:'12345678',
        name:"balan"
    })
    .expect(200);
})