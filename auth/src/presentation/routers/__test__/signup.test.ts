import request from 'supertest';
import { app } from '../../../app';

jest.mock('nodemailer');


  it("returns a success signup", async () => {
    return request(app)
      .post('/auth/user/register')
      .send({
        email: "studyansif@gmail.com",
        password: '12345678',
        name: "balan"
      })
      .expect(200);
  });
// });