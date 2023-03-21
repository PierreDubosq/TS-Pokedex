import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import Server from '../sources/Server';
import Database from '../sources/Database';
import Config from '../utils/Config';
import Seed from '../utils/Seed';

describe('Query pokemons', () => {
  const server = new Server(3003);

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
    const accountResponse = await request(server.app).post('/login').send({
      username: Config.ADMIN_USERNAME,
      password: Config.ADMIN_PASSWORD,
    });

    const { token } = accountResponse.body;

    await request(server.app)
      .post('/pokemon')
      .set('Authorization', `${token}`)
      .attach('file', '/app/tests/assets/bulbasaur.png')
      .field('number', 1)
      .field('name', 'Bulbasaur')
      .field('types', ['Grass', 'Poison']);

    await request(server.app)
      .post('/pokemon')
      .set('Authorization', `${token}`)
      .attach('file', '/app/tests/assets/ivysaur.png')
      .field('number', 2)
      .field('name', 'Ivysaur')
      .field('types', ['Grass', 'Poison']);

    const query: string = `
      query Pokemons {
        pokemons {
          types
          number
          name
          image
        }
      }
    `;

    const response = await request(server.app).post('/graphql').send({ query });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.data.pokemons).toHaveLength(2);
  });
});