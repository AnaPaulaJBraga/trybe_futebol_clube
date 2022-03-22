import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';

const secret = readFileSync(`${__dirname}/../../jwt.evaluation.key`);

export default async function generateToken(
  id: number,
  username: string,
  role: string,
  email: string,
) {
  const token = jwt.sign(
    {
      id,
      username,
      role,
      email,
    },
    secret,
    { expiresIn: '3d' },
  );

  return token;
}
