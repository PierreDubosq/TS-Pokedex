import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import Server from '../sources/Server';
import Database from '../sources/Database';
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

  it('Should return 400', async () => {
    const response = await request(server.app)
      .post('/pokemon')
      .attach('file', '/app/tests/assets/bulbasaur.png')
      .field('name', 'Bulbasaur')
      .field('types', ['Grass', 'Poison']);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('Should return 400', async () => {
    const response = await request(server.app)
      .post('/pokemon')
      .attach('file', '/app/tests/assets/bulbasaur.png')
      .field('number', 1)
      .field('types', ['Grass', 'Poison']);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('Should return 400', async () => {
    const response = await request(server.app)
      .post('/pokemon')
      .attach('file', '/app/tests/assets/bulbasaur.png')
      .field('number', 1)
      .field('name', 'Bulbasaur');

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });

  it('Should return 400', async () => {
    const response = await request(server.app)
      .post('/pokemon')
      .field('number', 1)
      .field('name', 'Bulbasaur')
      .field('types', ['Grass', 'Poison']);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  });
});