import request from 'supertest';
import { app } from '../../../app';

// Move the mock outside and clean it up properly
// const sendMailMock =  jest.fn().mockResolvedValue({ messageId: 'test-id' });
// const closeMock = jest.fn();
// jest.mock('nodemailer', () => ({
//   createTransport: jest.fn(() => ({
//     sendMail: sendMailMock,
//     close: closeMock,
//   }))
// }));

// describe('User Signup', () => {
//   afterEach(() => {
//     jest.clearAllMocks(); // Clear mocks after each test
//   });

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