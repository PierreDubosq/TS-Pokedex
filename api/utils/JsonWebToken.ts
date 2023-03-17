import env from 'env-var';
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
    const secret: string = env.get('TOKEN_KEY').required().asString();
    const token: string = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
  }
}


export default JsonWebToken;