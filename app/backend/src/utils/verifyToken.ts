import { readFileSync } from 'fs';
import * as jwt from 'jsonwebtoken';

const secret = readFileSync(`${__dirname}/../../jwt.evaluation.key`);

export default async function verifyToken(token: string): Promise<any> {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    return false;
  }
}
