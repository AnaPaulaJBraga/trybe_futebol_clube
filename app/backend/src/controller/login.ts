import { Request, Response, NextFunction } from 'express';
import ILogin from '../interfaces/login';
import StatusCode from '../database/enums/status';
import login from '../service/login';

const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: ILogin = req.body;

  try {
    const loginUser = await login.login({ email, password });

    return res.status(StatusCode.HTTP_OK).json(loginUser);
  } catch (error) {
    next(error);
  }
};

export default {
  loginController,
};
