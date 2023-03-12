// import usersModel from '../models/usersModel';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';

config();

const secretKey = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig = { expiresIn: '7d' };

const validateLogin = async (usersInfo: { email: string, password: string }) => {
//   const allUsers = await usersModel.findAll();
  const { email, password } = usersInfo;

  if (!email || !password) {
    return { type: 1, message: 'All fields must be filled' };
  }

  const validateEmail = email.toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const validatePassword = password.length > 6;

  if (!validateEmail || !validatePassword) {
    return { type: 1, message: 'All fields must be filled' };
  }

  const token = sign({ data: { email } }, secretKey, jwtConfig);
  return { type: 2, token };
};

export default validateLogin;
