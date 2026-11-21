const request = require('supertest');
const app = require('../src/app');
const { users } = require('../src/db');

const user = { email: 'ana@example.com', password: 'secreto123' };

beforeEach(() => {
  users.length = 0;
});

describe('POST /auth/register', () => {
  test('registra un usuario nuevo', async () => {
    const res = await request(app).post('/auth/register').send(user);
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(user.email);
  });

  test('rechaza un email con formato inválido', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'no-es-email', password: 'x' });
    expect(res.status).toBe(400);
  });

  test('rechaza si falta la contraseña', async () => {
    const res = await request(app).post('/auth/register').send({ email: user.email });
    expect(res.status).toBe(400);
  });

  test('devuelve 409 si el email ya existe', async () => {
    await request(app).post('/auth/register').send(user);
    const res = await request(app).post('/auth/register').send(user);
    expect(res.status).toBe(409);
  });
});

describe('POST /auth/login', () => {
  beforeEach(async () => {
    await request(app).post('/auth/register').send(user);
  });

  test('devuelve un JWT con credenciales correctas', async () => {
    const res = await request(app).post('/auth/login').send(user);
    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
  });

  test('devuelve 401 con contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: user.email, password: 'otra' });
    expect(res.status).toBe(401);
  });

  test('devuelve 401 si el usuario no existe', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'nadie@example.com', password: 'x' });
    expect(res.status).toBe(401);
  });
});
