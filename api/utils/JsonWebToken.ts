import Config from './Config';

import jwt from 'jsonwebtoken';


class JsonWebToken {
  /**
   * @brief Sign a payload with a secret key
   * 
   * @param payload Payload to sign
   * 
   * @returns Signed token
   */
  public static sign = (payload: string | object | Buffer): string => {
    const secret: string = Config.TOKEN_KEY;
    const token: string = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
  }

  /**
   * @brief Verify a token with a secret key
   * 
   * @param token Token to verify
   * 
   * @returns Decoded token
   */
  public static verify = (token: string): string | jwt.JwtPayload => {
    const secret: string = Config.TOKEN_KEY;
    const decoded: string | jwt.JwtPayload = jwt.verify(token, secret);
    return decoded;
  }
}


export default JsonWebToken;