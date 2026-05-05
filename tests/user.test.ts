import request from 'supertest';
import app from '../src/app';

let userToken: string;
let adminToken: string;
let userId: string;
let user2Id: string;


describe('User Service API tests', () => {
  /* 1. USER can register  */
  it('should register user1', async () => {
    const res = await request(app).post('/users/register').send({
      fullName: 'User One',
      birthDate: '1990-01-01',
      email: 'user1@test.com',
      password: '123456'
    });

    userId = res.body.id;
    expect(res.status).toBe(200);
  });

  it('should register user2', async () => {
    const res = await request(app).post('/users/register').send({
      fullName: 'User Two',
      birthDate: '1990-01-01',
      email: 'user2@test.com',
      password: '123456'
    });

    user2Id = res.body.id;
    expect(res.status).toBe(200);
  });

  /* 2. USER can login  */
  it('should login user1', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'user1@test.com',
      password: '123456'
    });

    userToken = res.body.token;
    expect(userToken).toBeDefined();
  });

  /* 2. ADMIN can login  */
  it('should login admin', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'salme@gmail.com',
      password: '123456'
    });

    adminToken = res.body.token;
    expect(adminToken).toBeDefined();
  });

  /* 3. USER cannot get another user profile  */
  it('USER cannot access another user profile', async () => {
    const res = await request(app)
      .get(`/users/${user2Id}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });
  /* 3. USER can get his/her profile  */
  it('USER can access his profile', async () => {
    const res = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
  });
  /* 4. ADMIN CAN access user profile  */
  it('ADMIN can access any user profile', async () => {
    const res = await request(app)
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });

  /*5. USER cannot block another user */
  it('USER cannot block another user', async () => {
    const res = await request(app)
      .patch(`/users/${user2Id}/block`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
  });

  /* 6. ADMIN can block user   */
  it('ADMIN can block user2', async () => {
    const res = await request(app)
      .patch(`/users/${user2Id}/block`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });

  /* 7. BLOCKED user cannot login */
  it('BLOCKED user cannot login', async () => {
    const res = await request(app).post('/users/login').send({
      email: 'user2@test.com',
      password: '123456'
    });

    expect(res.status).toBe(400); 
  });

  /* 8. ADMIN can get list of users */
  it('ADMIN can get list of users', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});