import request from 'supertest';
import { httpServer } from '../app';

const verifyToken = async () => {

    const res = await request(httpServer)
    .post('/auth/user/register')
    .send({
        name: 'test user',
        email: 'ansif3060@gmail.com',
        mobile:"1234567890",
        password: 'password'
    })
    .expect(200);
    const cookie = res.get('Set-Cookie');
    return cookie
}

// const accessToken = async () => {

//     const res = await request(httpServer)
//     .post('/auth/user/createUser')
//     .send({
//         name: 'test user',
//         email: 'ansif3060@gmail.com',
//         mobile:"1234567890",
//         password: 'password'
//     })
//     .expect(201);
//     const cookie = res.get('Set-Cookie');
//     return cookie
// }
  
  export {verifyToken}