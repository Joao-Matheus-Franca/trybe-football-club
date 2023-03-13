import { Request, Response } from 'express';
import showAllMatches from '../services/matchesService';

const sendAllMatches = async (_req: Request, res: Response) => {
  const result = await showAllMatches();
  return res.status(200).json(result);
};

export default sendAllMatches;
