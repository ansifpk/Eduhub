import request from 'supertest';
import { httpServer } from '../../../../app';


  it('returns 400 for invalid email', async () => {
    const res = await request(httpServer)
        .post('/auth/user/register')
        .send({
            name: 'test user',
            email: 'ansif3060@gmail.com',
            mobile:"1234567890",
            password: 'password'
        })
        .expect(200);

    await request(httpServer)
      .post('/auth/user/login')
      .send({
        email: 'ansif30600@gmail.com',
        password: 'password'
      })
      .expect(400);
  });

  it('returns 400 for invalid password', async () => {
    const res = await request(httpServer)
        .post('/auth/user/register')
        .send({
            name: 'test user',
            email: 'ansif3060@gmail.com',
            mobile:"1234567890",
            password: 'password'
        })
        .expect(200);

    await request(httpServer)
      .post('/auth/user/login')
      .send({
        email: 'ansif3060@gmail.com',
        password: 'passwordd'
      })
      .expect(400);
  });
