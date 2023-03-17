import Config from '../utils/Config';

import mongoose from 'mongoose';
import Logger from 'poseidon-logger';


class Database {
  /**
   * @brief Connect to the database
   * 
   * @param retry Number of retries
   */
  public static async connect(retry = 10): Promise<void> {
    const uri: string = `mongodb://${Config.MONGO_INITDB_ROOT_USERNAME}:${Config.MONGO_INITDB_ROOT_PASSWORD}@database:27017/${Config.MONGO_INITDB_DATABASE}?authSource=admin`;

    try {
      await mongoose.connect(uri);
      Logger.info('Connected to database');
    } catch (error: unknown) {
      if (retry > 0) {
        Logger.warn(`Failed to connect to database, retrying in 5 seconds (${retry} retries left)`);
        await new Promise<void>((resolve: () => void): NodeJS.Timeout => setTimeout(resolve, 5000));
        await Database.connect(retry - 1);
      } else {
        throw error;
      }
    }
  }
}


export default Database;