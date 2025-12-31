import request from 'supertest';
import { app } from '../../../app';

jest.mock('nodemailer');

describe('User Registration', () => {
  it('returns 200 and sets cookie', async () => {
    const res = await request(app)
      .post('/auth/user/register')
      .send({
        name: 'test user',
        email: 'testuser@gmail.com',
        password: 'password'
      })
      .expect(200);

    expect(res.body.succes).toBe(true);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('rejects invalid email', async () => {
    await request(app)
      .post('/auth/user/register')
      .send({
        name: 'test user',
        email: 'bademail@yahoo.com',
        password: 'password',
      })
      .expect(400);
  });
});