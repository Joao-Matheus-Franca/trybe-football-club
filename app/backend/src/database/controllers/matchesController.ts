import { Request, Response } from 'express';
import showAllMatches, { updateMatcheStatus } from '../services/matchesService';

const sendAllMatches = async (_req: Request, res: Response) => {
  const result = await showAllMatches();
  return res.status(200).json(result);
};

export const filterMatches = async (req: Request, res: Response) => {
  const { query: { inProgress } } = req;
  const result = await showAllMatches();

  if (inProgress === undefined) {
    return res.status(200).json(result);
  }

  if (inProgress === 'true') {
    const inProgressMatches = result.filter((r) => r.inProgress === true);
    return res.status(200).json(inProgressMatches);
  }
  if (inProgress === 'false') {
    const finishedMatches = result.filter((r) => r.inProgress === false);
    return res.status(200).json(finishedMatches);
  }
};

export const finishMatch = async (req: Request, res: Response) => {
  const { params: { id } } = req;
  await updateMatcheStatus(Number(id));
  res.status(200).json({ message: 'Finished' });
};

export default sendAllMatches;
