import { authValidation } from '../middleware/authMiddleware';
import Users from '../database/models/users';
import ILogin from '../interfaces/login';

const login = async ({ email }: ILogin) => {
  const userLogin = await Users.findOne({ where: { email } });

  if (!userLogin) {
    return { message: 'Incorrect email or password' };
  }
  const token = authValidation({ username: userLogin.username, role: userLogin.role, email });
  return {
    user: {
      id: userLogin.id,
      username: userLogin.username,
      role: userLogin.role,
      email,
    },
    token,
  };
};
export default {
  login,
};
