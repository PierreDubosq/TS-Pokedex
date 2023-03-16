import { ApolloServer } from '@apollo/server';
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
}


export default Server;