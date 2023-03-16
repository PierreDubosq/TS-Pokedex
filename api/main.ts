import Logger from 'poseidon-logger';

import Server from './sources/Server';


async function main(): Promise<void> {
  const server = new Server();

  await server.start();
}


main()
  .catch((error: Error): void => {
    Logger.error(error);
  });
