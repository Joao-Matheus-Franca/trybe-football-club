import { Request, Response } from 'express';
import leaderboardHome, { leaderboardAway } from '../services/leaderboardService';

const showHomeLeaderboard = async (_req: Request, res: Response) => {
  const result = await leaderboardHome();

  return res.status(200).json(result);
};

export const showAwayLeaderboard = async (_req: Request, res: Response) => {
  const result = await leaderboardAway();

  return res.status(200).json(result);
};

export default showHomeLeaderboard;
