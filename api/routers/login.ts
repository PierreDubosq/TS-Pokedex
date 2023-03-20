import IUser from '../interfaces/IUser';
import User from '../models/User';
import JsonWebToken from '../utils/JsonWebToken';

import { Request, Response, Router } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import Logger from 'poseidon-logger';


const router = Router();


router.post('/login',
  async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    const {
      username,
      password
    }: {
      username: string | undefined,
      password: string | undefined
    } = request.body;

    Logger.debug(`POST /login: ${JSON.stringify(request.body)}`);

    if (!username) {
      Logger.warn('Error in POST /login: Username is required');

      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({
          message: ReasonPhrases.BAD_REQUEST,
          error: 'Username is required'
        });
    }

    if (!password) {
      Logger.warn('Error in POST /login: Password is required');

      return response
        .status(StatusCodes.BAD_REQUEST)
        .json({
          message: ReasonPhrases.BAD_REQUEST,
          error: 'Password is required'
        });
    }

    const dbUser: IUser | null = await User.findOne({
      username
    });

    if (!dbUser) {
      Logger.warn(`Error in POST /login: User ${username} not found`);

      return response
        .status(StatusCodes.NOT_FOUND)
        .json({
          message: ReasonPhrases.NOT_FOUND,
          error: 'User not found'
        });
    }

    const isPasswordValid: boolean = await dbUser.comparePassword(password);

    if (!isPasswordValid) {
      Logger.warn(`Error in POST /login: Invalid password for user ${username}`);

      return response
        .status(StatusCodes.UNAUTHORIZED)
        .json({
          message: ReasonPhrases.UNAUTHORIZED,
          error: 'Invalid password'
        });
    }

    const token: string = JsonWebToken.sign({
      id: dbUser._id
    });

    Logger.info(`Success in POST /login: User ${username} logged in`);

    return response
      .status(StatusCodes.OK)
      .json({
        message: ReasonPhrases.OK,
        token
      });
  }
);


export default router;