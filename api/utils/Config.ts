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

  /**
   * @brief Get the MONGO_INITDB_DATABASE variable from the environment
   * 
   * @returns The MONGO_INITDB_DATABASE variable
   */
  public static get MONGO_INITDB_DATABASE(): string {
    return env.get('MONGO_INITDB_DATABASE').required().asString();
  }

  /**
   * @brief Get the TOKEN_KEY variable from the environment
   * 
   * @returns The TOKEN_KEY variable
   */
  public static get TOKEN_KEY(): string {
    return env.get('TOKEN_KEY').required().asString();
  }

  /**
   * @brief Get the ADMIN_USERNAME variable from the environment
   * 
   * @returns The ADMIN_USERNAME variable
   */
  public static get ADMIN_USERNAME(): string {
    return env.get('ADMIN_USERNAME').default('admin').asString();
  }

  /**
   * @brief Get the ADMIN_PASSWORD variable from the environment
   * 
   * @returns The ADMIN_PASSWORD variable
   */
  public static get ADMIN_PASSWORD(): string {
    return env.get('ADMIN_PASSWORD').default('admin').asString();
  }
}


export default Config;