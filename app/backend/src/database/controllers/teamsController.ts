import { Request, Response } from 'express';
import teamsService, { showTeamById } from '../services/teamsService';

const sendAllTeams = async (_req: Request, res: Response) => {
  const result = await teamsService();

  return res.status(200).json(result);
};

export const sendOneTeam = async (req: Request, res: Response) => {
  const { params: { id } } = req;
  const result = await showTeamById(id);

  return res.status(200).json(result);
};

export default sendAllTeams;
