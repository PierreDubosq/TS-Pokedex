import Logger from 'poseidon-logger';


async function main(): Promise<void> {
  Logger.info('Hello World!');
}


main()
  .catch((error: Error): void => {
    Logger.error(error);
  });
