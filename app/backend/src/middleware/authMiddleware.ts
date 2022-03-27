import * as Jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { Request, Response } from 'express';
import StatusCode from '../database/enums/status';
import IToken from '../interfaces/Token';

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const authValidation = ({ username, role, email }: IToken) => {
  const token = Jwt.sign({ username, role, email }, SECRET, {
    expiresIn: '3d',
    algorithm: 'HS256',
  });

  return token;
};

const authVerify = (req: Request, res: Response) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCode.HTTP_UNAUTHORIZED).json({ message: 'Token invalid' });
  }

  const decoded = Jwt.verify(authorization, SECRET);
  const { role } = decoded as IToken;

  if (!decoded) {
    return res.status(StatusCode.HTTP_UNAUTHORIZED).json({ message: 'Token invalid' });
  }

  return res.status(StatusCode.HTTP_OK).send(role);
};

export {
  authValidation,
  authVerify,
};
