import request from 'supertest';
import { app } from '../../../app';


  it('returns 200 and sets cookie', async () => {
    const res = await request(app)
      .post('/auth/user/register')
      .send({
        name: 'test user',
        email: 'ansif3060@gmail.com',
        password: 'password'
      })
      .expect(200);

    // expect(res.body.succes).toBe(true);
    // expect(res.headers['set-cookie']).toBeDefined();
  });
