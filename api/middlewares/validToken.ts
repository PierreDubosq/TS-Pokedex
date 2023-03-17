import JsonWebToken from '../utils/JsonWebToken';

import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';


async function validToken(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> {
  const token: string | undefined = request.headers.authorization;

  if (!token) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: 'Token is required'
      });
  }

  try {
    const decoded: string | JwtPayload = JsonWebToken.verify(token);

    request.user = decoded;

    return next();
  } catch (error) {
    return response
      .status(StatusCodes.UNAUTHORIZED)
      .json({
        message: ReasonPhrases.UNAUTHORIZED,
        error: 'Invalid token'
      });
  }
}


export default validToken;