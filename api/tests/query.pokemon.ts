import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import Server from '../sources/Server';
import Database from '../sources/Database';
import Config from '../utils/Config';
import Seed from '../utils/Seed';

describe('Query pokemons', () => {
  const server = new Server(3004);

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

    const query = `
      query Pokemon($number: Int!) {
        pokemon(number: $number) {
          image
          name
          number
          types
        }
      }    
    `;

    const response = await request(server.app).post('/graphql').send({
      query,
      variables: {
        number: 1,
      },
    });

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body.data.pokemon).toHaveProperty('image');
    expect(response.body.data.pokemon).toHaveProperty('name');
    expect(response.body.data.pokemon).toHaveProperty('number');
    expect(response.body.data.pokemon).toHaveProperty('types');
  });
});