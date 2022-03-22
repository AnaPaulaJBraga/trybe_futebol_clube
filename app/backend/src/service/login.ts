import * as bcrypt from 'bcryptjs';
import Users from '../database/models/users';
import { generateToken } from '../utils/generateToken';
import { verifyToken } from '../utils/verifyToken';

function validateUser(email: string, password: string) {
    if (!email || !password) {
        return true;
    }
    return false;
}

export async function login(email: string, password: string) {
    if (validateUser(email, password)) {
      return { response: { message: 'All fields must be filled' }, status: 401 };
    }
    const user: Users | null = await Users.findOne({
      raw: true,
      where: { email },
    });
    if (!user) {
      return { response: { message: 'Incorrect email or password' }, status: 401 };
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return { response: { message: 'Incorrect email or password' }, status: 401 };
    }
    const { id, username, role } = user;
    return {
      response: { user: user, token: await generateToken(id, username, role) }, status: 200,
    };
  }

  export async function validateToken(token: any) {
    const tokenOk = await verifyToken(token);
    if (!tokenOk) {
      return { response: { message: 'token invalid' }, status: 401 };
    }
    const { role } = tokenOk.payload;
    return { response: role, status: 200 };
  }

