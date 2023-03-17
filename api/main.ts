import Logger from 'poseidon-logger';

import Database from './sources/Database';
import Server from './sources/Server';


async function main(): Promise<void> {
  await Database.connect();
  await (new Server()).start();
}


main()
  .catch((error: Error): void => {
    Logger.error(error);
  });
