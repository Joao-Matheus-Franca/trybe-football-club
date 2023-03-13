import matchesModel from '../models/matchesModel';
import Teams from '../models/teamsModel';

const showAllMatches = async () => {
  const matches = await matchesModel.findAll({ include:
    [{ model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] }] });
  return matches;
};

export default showAllMatches;
