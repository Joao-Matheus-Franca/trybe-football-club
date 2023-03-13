import { NextFunction, Request, Response } from 'express';
import Teams from '../models/teamsModel';

const validateNewMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { body: { homeTeamId, awayTeamId } } = req;
  const allTeams = await Teams.findAll();
  const validateHomeTeam = allTeams.some((t) => t.id === homeTeamId);
  const validadteAwayTeam = allTeams.some((t) => t.id === awayTeamId);
  const validateMatch = homeTeamId === awayTeamId;

  if (!validateHomeTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  if (!validadteAwayTeam) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  if (validateMatch) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

export default validateNewMatch;
