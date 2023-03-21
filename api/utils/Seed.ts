import User from '../models/User';
import Config from './Config';

import Logger from 'poseidon-logger';


class Seed {
  /**
   * @brief Seed the database
   */
  public static async run(): Promise<void> {
    try {
      await User.findOneAndDelete({
        $or: [
          {
            username: Config.ADMIN_USERNAME
          },
          {
            email: Config.ADMIN_EMAIL
          }
        ]
      });

      await User.create({
        username: Config.ADMIN_USERNAME,
        password: Config.ADMIN_PASSWORD,
        email: Config.ADMIN_EMAIL
      });

      Logger.info('Database seeded');
    } catch (error) {
      Logger.error(`Error in Seed.run: ${error}`);
    }
  }
}


export default Seed;