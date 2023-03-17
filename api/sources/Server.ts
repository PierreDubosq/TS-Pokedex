import Logger from 'poseidon-logger';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import * as fs from 'fs';


class Server {
  private server: ApolloServer;
  private app: Application;

  constructor() {
    this.server = new ApolloServer({
      typeDefs: `
        type Query {
          hello: String
        }
      `,
      resolvers: {
        Query: {
          hello: () => 'Hello world!',
        },
      },
    });

    this.app = express();

    this.app.set('view engine', 'ejs');
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