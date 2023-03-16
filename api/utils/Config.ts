import env from 'env-var';


class Config {
  /**
   * @brief Get the MONGO_INITDB_ROOT_USERNAME variable from the environment
   * 
   * @returns The MONGO_INITDB_ROOT_USERNAME variable
   */
  public static get MONGO_INITDB_ROOT_USERNAME(): string {
    return env.get('MONGO_INITDB_ROOT_USERNAME').required().asString();
  }

  /**
   * @brief Get the MONGO_INITDB_ROOT_PASSWORD variable from the environment
   * 
   * @returns The MONGO_INITDB_ROOT_PASSWORD variable
   */
  public static get MONGO_INITDB_ROOT_PASSWORD(): string {
    return env.get('MONGO_INITDB_ROOT_PASSWORD').required().asString();
  }
}


export default Config;