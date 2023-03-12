import { Request, Response } from 'express';
import validateLogin from '../services/usersService';

const login = async (req: Request, res: Response) => {
  const { body: { email, password } } = req;
  const validate = await validateLogin({ email, password });

  if (validate.type === 1) {
    return res.status(400).json({ message: validate.message });
  }

  if (validate.type === 2) {
    return res.status(401).json({ message: validate.message });
  }

  return res.status(200).json({ token: validate.token });
};

export default login;
