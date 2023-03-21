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

    ((message: string): void => {
      if (status >= 500) {
        Logger.error(message);
      } else if (status >= 400) {
        Logger.warn(message);
      } else {
        Logger.info(message);
      }
    })(`${status} ${(request.headers['x-forwarded-for'] || request.socket.remoteAddress || '').toString().padEnd(15)} ${request.method.padEnd(7)} ${request.url}`);
  });

  return next();
}


export default requestLog;