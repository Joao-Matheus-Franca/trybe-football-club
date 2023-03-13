import matchesModel from '../models/matchesModel';
import Teams from '../models/teamsModel';

const showAllMatches = async () => {
  const matches = await matchesModel.findAll({ include:
    [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] }] });
  return matches;
};

export const updateMatchStatus = async (id: number) => {
  await matchesModel.update({ inProgress: false }, { where: { id } });
};

export const updateMatchScore = async (id: number, htg: number, atg: number) => {
  await matchesModel.update({ homeTeamGoals: htg, awayTeamGoals: atg }, { where: { id } });
};

export const createMatch = async (matchData: { homeTeamId: number, awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number }) => {
  const created = await matchesModel.create({ ...matchData, inProgress: true });
  return created;
};

export default showAllMatches;
