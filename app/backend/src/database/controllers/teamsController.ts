import { Request, Response } from 'express';
import { showAllTeams, showTeamById } from '../services/teamsService';

export const sendAllTeams = async (_req: Request, res: Response) => {
  const result = await showAllTeams();

  return res.status(200).json(result);
};

export const sendOneTeam = async (req: Request, res: Response) => {
  const { params: { id } } = req;
  const result = await showTeamById(id);

  return res.status(200).json(result);
};
