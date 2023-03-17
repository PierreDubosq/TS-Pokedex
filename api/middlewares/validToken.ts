import ITokenPayload from '../interfaces/ITokenPayload';
import JsonWebToken from '../utils/JsonWebToken';

import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import Logger from 'poseidon-logger';


async function validToken(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> {
  const token: string | undefined = request.headers.authorization;

  if (!token) {
    Logger.warn('Error in validToken: No token provided');

    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: 'Token is required'
      });
  }

  try {
    const decoded: ITokenPayload = JsonWebToken.verify(token) as ITokenPayload;

    request.user = decoded;

    Logger.info(`Success in validToken: Token is valid for user ${decoded.id}`);

    return next();
  } catch (error) {
    Logger.warn('Error in validToken: Invalid token');

    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: 'Invalid token'
      });
  }
}


export default validToken;