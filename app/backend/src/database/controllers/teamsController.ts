import { Request, Response } from 'express';
import teamsService from '../services/teamsService';

const sendAllTeams = async (_req: Request, res: Response) => {
  const result = await teamsService();

  return res.status(200).json(result);
};

export default sendAllTeams;
