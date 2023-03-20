import Database from './sources/Database';
import Server from './sources/Server';
import Seed from './utils/Seed';

import { JwtPayload } from 'jsonwebtoken';
import Logger from 'poseidon-logger';


declare module 'express' { 
  export interface Request {
    user?: string | JwtPayload;
  }
}


async function main(): Promise<void> {
  await Database.connect();
  await Seed.run();
  await (new Server()).start();
}


main()
  .catch((error: Error): void => {
    Logger.error(error);
  });
