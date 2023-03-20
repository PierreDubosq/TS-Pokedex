import IPokemon from '../interfaces/IPokemon';
import Pokemon from '../models/Pokemon';
import JsonWebToken from '../utils/JsonWebToken';

import { Request, Response, Router } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import Logger from 'poseidon-logger';


const router = Router();


router.post('/pokemon',
  async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      return response
        .status(StatusCodes.OK)
        .json({
          message: ReasonPhrases.OK,
          data: 'Hello World'
        });
    } catch (error) {
      Logger.error(`Error in POST /pokemon: ${error}`);

      return response
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          message: ReasonPhrases.INTERNAL_SERVER_ERROR,
          error: error
        });
    }
  }
);


export default router;