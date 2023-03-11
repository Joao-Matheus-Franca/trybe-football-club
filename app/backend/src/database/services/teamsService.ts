import teamsModel from '../models/teamsModel';

const showAllTeams = async () => {
  const [result] = await teamsModel.findAll();
  return result;
};

export const showTeamById = async (id: string) => {
  const result = await teamsModel.findByPk(id);
  return result;
};

export default showAllTeams;
