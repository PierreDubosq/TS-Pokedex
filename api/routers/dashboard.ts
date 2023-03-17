import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logger from 'poseidon-logger';


const router = Router();


router.get('/dashboard',
  async (
    request: Request,
    response: Response
  ): Promise<void> => {
    Logger.info('Success in GET /dashboard');

    return response
      .status(StatusCodes.OK)
      .render('pages/dashboard');
  }
);


export default router;