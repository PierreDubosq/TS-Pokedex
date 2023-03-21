import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import Server from '../sources/Server';
import Database from '../sources/Database';
import Config from '../utils/Config';
import Seed from '../utils/Seed';

describe('Router /pokemon', () => {
  const server = new Server(3002);

  beforeAll(async () => {
    await Database.connect();
    await Seed.run();
    await server.start();
  });

  afterAll(async () => {
    await server.stop();
    await Database.disconnect();
  });

  it('Should return 201', async () => {
    const accountResponse = await request(server.app).post('/login').send({
      username: Config.ADMIN_USERNAME,
      password: Config.ADMIN_PASSWORD,
    });

    const { token } = accountResponse.body;

    const response = await request(server.app)
      .post('/pokemon')
      .set('Authorization', `${token}`)
      .attach('file', '/app/tests/assets/bulbasaur.png')
      .field('number', 1)
      .field('name', 'Bulbasaur')
      .field('types', ['Grass', 'Poison']);

    expect(response.status).toBe(StatusCodes.CREATED);
  });

  it('Should return 400', async () => {
    const accountResponse = await request(server.app).post('/login').send({
      username: Config.ADMIN_USERNAME,
      password: Config.ADMIN_PASSWORD,
    });

    const { token } = accountResponse.body;

    const response = await request(server.app)
      .post('/pokemon')
      .set('Authorization', `${token}`)
      .attach('file', '/app/tests/assets/bulbasaur.png')
      .field('name', 'Bulbasaur')
      .field('types', ['Grass', 'Poison']);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('Should return 400', async () => {
    const accountResponse = await request(server.app).post('/login').send({
      username: Config.ADMIN_USERNAME,
      password: Config.ADMIN_PASSWORD,
    });

    const { token } = accountResponse.body;

    const response = await request(server.app)
      .post('/pokemon')
      .set('Authorization', `${token}`)
      .attach('file', '/app/tests/assets/bulbasaur.png')
      .field('number', 1)
      .field('types', ['Grass', 'Poison']);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('Should return 400', async () => {
    const accountResponse = await request(server.app).post('/login').send({
      username: Config.ADMIN_USERNAME,
      password: Config.ADMIN_PASSWORD,
    });

    const { token } = accountResponse.body;

    const response = await request(server.app)
      .post('/pokemon')
      .set('Authorization', `${token}`)
      .attach('file', '/app/tests/assets/bulbasaur.png')
      .field('number', 1)
      .field('name', 'Bulbasaur');

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('Should return 400', async () => {
    const accountResponse = await request(server.app).post('/login').send({
      username: Config.ADMIN_USERNAME,
      password: Config.ADMIN_PASSWORD,
    });

    const { token } = accountResponse.body;

    const response = await request(server.app)
      .post('/pokemon')
      .set('Authorization', `${token}`)
      .field('number', 1)
      .field('name', 'Bulbasaur')
      .field('types', ['Grass', 'Poison']);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('Should return 401', async () => {
    const response = await request(server.app)
      .post('/pokemon')
      .attach('file', '/app/tests/assets/bulbasaur.png')
      .field('number', 1)
      .field('name', 'Bulbasaur')
      .field('types', ['Grass', 'Poison']);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
  });

  it('Should return 401', async () => {
    const response = await request(server.app)
      .post('/pokemon')
      .set('Authorization', 'Bad token')
      .attach('file', '/app/tests/assets/bulbasaur.png')
      .field('number', 1)
      .field('name', 'Bulbasaur')
      .field('types', ['Grass', 'Poison']);

    expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
  });

  it('Should return 409', async () => {
    const accountResponse = await request(server.app).post('/login').send({
      username: Config.ADMIN_USERNAME,
      password: Config.ADMIN_PASSWORD,
    });

    const { token } = accountResponse.body;

    await request(server.app)
      .post('/pokemon')
      .set('Authorization', `${token}`)
      .attach('file', '/app/tests/assets/ivysaur.png')
      .field('number', 2)
      .field('name', 'Ivysaur')
      .field('types', ['Grass', 'Poison']);

    const response = await request(server.app)
      .post('/pokemon')
      .set('Authorization', `${token}`)
      .attach('file', '/app/tests/assets/ivysaur.png')
      .field('number', 2)
      .field('name', 'Ivysaur')
      .field('types', ['Grass', 'Poison']);

    expect(response.status).toBe(StatusCodes.CONFLICT);
  });
});