import { Request, Response } from 'express';
import leaderboardHome from '../services/leaderboardService';

const showHomeLeaderboard = async (_req: Request, res: Response) => {
  const result = await leaderboardHome();

  return res.status(200).json(result);
};

export default showHomeLeaderboard;
