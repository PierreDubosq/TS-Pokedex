import IPokemon from '../interfaces/IPokemon';
import validToken from '../middlewares/validToken';
import Pokemon from '../models/Pokemon';
import JsonWebToken from '../utils/JsonWebToken';

import { Request, Response, Router } from 'express';
import * as fs from 'fs';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import multer from 'multer';
import Logger from 'poseidon-logger';


const router = Router();
const upload = multer({ dest: 'uploads/' });


router.post('/pokemon',
  validToken,
  upload.single('file'),
  async (
    request: Request,
    response: Response
  ): Promise<Response> => {
    try {
      const {
        number,
        name,
        types
      }: {
        number: number | undefined,
        name: string | undefined,
        types: string[] | undefined
      } = request.body;

      if (!number) {
        Logger.warn('Error in POST /pokemon: Number is required');

        return response
          .status(StatusCodes.BAD_REQUEST)
          .json({
            message: ReasonPhrases.BAD_REQUEST,
            error: 'Number is required'
          });
      }

      if (!name) {
        Logger.warn('Error in POST /pokemon: Name is required');

        return response
          .status(StatusCodes.BAD_REQUEST)
          .json({
            message: ReasonPhrases.BAD_REQUEST,
            error: 'Name is required'
          });
      }

      if (!types) {
        Logger.warn('Error in POST /pokemon: Types is required');

        return response
          .status(StatusCodes.BAD_REQUEST)
          .json({
            message: ReasonPhrases.BAD_REQUEST,
            error: 'Types is required'
          });
      }

      if (!request.file) {
        Logger.warn('Error in POST /pokemon: Image is required');

        return response
          .status(StatusCodes.BAD_REQUEST)
          .json({
            message: ReasonPhrases.BAD_REQUEST,
            error: 'Image is required'
          });
      }

      if (!request.file.mimetype.startsWith('image/')) {
        Logger.warn('Error in POST /pokemon: Image must be an image');

        return response
          .status(StatusCodes.BAD_REQUEST)
          .json({
            message: ReasonPhrases.BAD_REQUEST,
            error: 'Image must be an image'
          });
      }

      const dbPokemon: IPokemon | null = await Pokemon.findOne({
        $or: [
          {
            number
          },
          {
            name
          }
        ]
      });

      if (dbPokemon) {
        Logger.warn(`Error in POST /pokemon: Pokemon ${name} already exists`);

        return response
          .status(StatusCodes.CONFLICT)
          .json({
            message: ReasonPhrases.CONFLICT,
            error: 'Pokemon already exists'
          });
      }

      const newPath = `${request.file.destination}${JsonWebToken.sign({ name })}${request.file.originalname.substring(request.file.originalname.lastIndexOf('.'))}`;

      fs.renameSync(request.file.path, newPath);

      const newPokemon: IPokemon = await Pokemon.create({
        number,
        name,
        types,
        image: newPath
      });

      return response
        .status(StatusCodes.CREATED)
        .json({
          message: ReasonPhrases.CREATED,
          pokemon: newPokemon
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