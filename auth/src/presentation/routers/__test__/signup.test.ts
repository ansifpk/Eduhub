import request from 'supertest';
import { httpServer } from '../../app';

jest.mock('nodemailer', () => ({
  createTransport: () => ({
    sendMail: jest.fn()
  })
}));

it("reqtuen a success signup",async()=>{
    return request(httpServer)
    .post('/auth/user/register')
    .send({
        email:"studyansif@gmail.com",
        password:'12345678',
        name:"balan"
    })
    .expect(200);
})