import * as jwt from 'jsonwebtoken';

const secret = 'secret';

export async function verifyToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, secret);
      return decoded;
    } catch (err) {
      return false;
    }
  }