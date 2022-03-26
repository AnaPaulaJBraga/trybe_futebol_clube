import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';
import { compareSync } from 'bcryptjs';
import ILogin from '../interfaces/login';
import StatusCode from '../database/enums/status';
import Users from '../database/models/users';

const joi = Joi.object({
  email: Joi.string().required().min(1),
  password: Joi.string().required().min(6),
});

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: ILogin = req.body;
  const { error } = joi.validate({ email, password });

  if (error) {
    return res.status(StatusCode.HTTP_UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }
  return next();
};

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: ILogin = req.body;
  const getEmail = await Users.findOne({ where: { email } });

  if (!getEmail) {
    return res
      .status(StatusCode.HTTP_UNAUTHORIZED)
      .json({ message: 'Incorrect email or password' });
  }
  const getPassword = compareSync(password, getEmail.password);
  if (!getPassword) {
    return res
      .status(StatusCode.HTTP_UNAUTHORIZED)
      .json({ message: 'Incorrect email or password' });
  }
  return next();
};

export default {
  validateLogin,
  validateUser,
};
