import * as jwt from 'jsonwebtoken';

const secret = 'secret';

export async function generateToken(id: number, username: string, role: string) {
  const token = jwt.sign({
    id, username, role,
  }, secret, { expiresIn: '7d' });
  return token;
}
