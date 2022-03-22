import { Request, Response } from 'express';
import * as loginService from '../service/login';

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  const user = await loginService.login(email, password);
  res.status(user.status).json(user.response);
}

export async function validate(req: Request, res: Response): Promise<void> {
  const { authorization } = req.headers;
  const validateToken = await loginService.validateToken(authorization);
  res.status(validateToken.status).send(validateToken.response);
}
