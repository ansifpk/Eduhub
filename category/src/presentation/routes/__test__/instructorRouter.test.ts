import { app } from "../../../app";
import request from 'supertest'


  it('returns 400 for invalid password', async () => {
    const res = await request(app)
        .get('/category/instructor/category')
        .expect(200);
  });
