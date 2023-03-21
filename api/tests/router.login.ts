import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import Server from '../sources/Server';
import Database from '../sources/Database';
import Config from '../utils/Config';
import Seed from '../utils/Seed';

describe('Router /login', () => {
  const server = new Server(3001);

  beforeAll(async () => {
    await Database.connect();
    await Seed.run();
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
    await Database.disconnect();
  });

  it('Should return 200', async () => {
    const response = await request(server.app).post('/login').send({
      username: Config.ADMIN_USERNAME,
      password: Config.ADMIN_PASSWORD,
    });

    expect(response.status).toBe(StatusCodes.OK);
  });

  it('Should return 400', async () => {
    const response = await request(server.app).post('/login').send({
      username: Config.ADMIN_USERNAME,
    });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('Should return 400', async () => {
    const response = await request(server.app).post('/login').send({
      password: Config.ADMIN_PASSWORD,
    });

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('Should return 401', async () => {
    const response = await request(server.app).post('/login').send({
      username: Config.ADMIN_USERNAME,
      password: 'wrong_password',
    });

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
  });

  it('Should return 404', async () => {
    const response = await request(server.app).post('/login').send({
      username: 'wrong_username',
      password: Config.ADMIN_PASSWORD,
    });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});