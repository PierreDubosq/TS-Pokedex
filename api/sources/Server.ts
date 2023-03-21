import requestLog from '../middlewares/requestLog';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';
import express, { Application, urlencoded } from 'express';
import * as fs from 'fs';
import Logger from 'poseidon-logger';


class Server {
  private server: ApolloServer;
  private app: Application;

  constructor() {
    this.server = new ApolloServer({
      typeDefs: `
        type IPokemon {
          number: Int!
          name: String!
          types: [String!]!
          image: String!
        }

        type Query {
          pokemons: [IPokemon!]!
          pokemon(number: Int!): IPokemon
        }
      `,
      resolvers: {
        Query: {
          pokemons: require('../resolvers/query.pokemons').default,
          pokemon: require('../resolvers/query.pokemon').default,
        },
      },
    });

    this.app = express();
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(requestLog);
  }

  /**
   * @brief Start the server
   */
  public async start(): Promise<void> {
    if (!fs.existsSync(`${__dirname}/../routers`)) {
      Logger.error('No routers found');
      throw new Error('No routers found');
    }
    for (const file of fs.readdirSync(`${__dirname}/../routers`)) {
      this.app.use((await import(`../routers/${file}`)).default);
      Logger.info(`Loaded router: ${file}`);
    }

    await this.server.start();

    this.app.use('/graphql', cors(), json(), expressMiddleware(this.server));

    await new Promise<void>((resolve: () => void): void => {
      this.app.listen(3000, (): void => {
        Logger.info('Server started');

        resolve();
      });
    });
  }

  /**
   * @brief Stop the server
   */
  public async stop(): Promise<void> {
    await this.server.stop();

    Logger.info('Server stopped');
  }
}


export default Server;