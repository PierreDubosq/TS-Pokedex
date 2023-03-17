import Logger from 'poseidon-logger';

import { Request, Response, NextFunction } from 'express';


async function requestLog(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  response.on('finish', () => {
    const {
      statusCode: status
    }: {
      statusCode: number
    } = response;
    const ip: string = (request.headers['x-forwarded-for'] || request.socket.remoteAddress || '').toString();
    const message: string = `${status} ${ip.padEnd(15)} ${request.method.padEnd(7)} ${request.url}`;

    Logger.info(message);
  });

  return next();
}


export default requestLog;