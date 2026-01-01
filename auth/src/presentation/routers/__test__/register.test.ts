import request from 'supertest';
import { httpServer } from '../../../app';


  it('returns 200 and sets cookie', async () => {
    const res = await request(httpServer)
      .post('/auth/user/register')
      .send({
        name: 'test user',
        email: 'ansif3060@gmail.com',
        password: 'password'
      })
      .expect(200);
  });
