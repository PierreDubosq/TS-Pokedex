import Logger from 'poseidon-logger';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'body-parser';
import express, { Application } from 'express';


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
  }

  /**
   * @brief Start the server
   */
  public async start(): Promise<void> {
    await this.server.start();

    this.app.use('/graphql', cors(), json(), expressMiddleware(this.server));

    await new Promise<void>((resolve: () => void): void => {
      this.app.listen(3000, (): void => {
        Logger.info('Server started');

        resolve();
      });
    });
  }
}


export default Server;