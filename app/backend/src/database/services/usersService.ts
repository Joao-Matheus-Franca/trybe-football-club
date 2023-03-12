import { compareSync } from 'bcryptjs';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';
import usersModel from '../models/usersModel';

config();

const secretKey = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig = { expiresIn: '7d' };

const validateLogin = async (usersInfo: { email: string, password: string }) => {
  const allUsers = await usersModel.findAll();
  const { email, password } = usersInfo;

  if (!email || !password) {
    return { type: 1, message: 'All fields must be filled' };
  }

  const validateEmail = email.toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

  const validateDBEmail = allUsers.some((u) => u.email === email);

  const user = allUsers.find((u) => u.email === email);

  const validatePassword = password.length > 6;

  const validateDBPass = compareSync(password, user?.password || '');

  console.log(validateDBPass);

  if (!validateEmail || !validatePassword || !validateDBEmail || !validateDBPass) {
    return { type: 2, message: 'Invalid email or password' };
  }

  const token = sign({ data: { email } }, secretKey, jwtConfig);
  return { type: 3, token };
};

export default validateLogin;
