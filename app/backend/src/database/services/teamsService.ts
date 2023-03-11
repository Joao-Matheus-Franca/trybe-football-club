import teamsModel from '../models/teamsModel';

export const showAllTeams = async () => {
  const result = await teamsModel.findAll();
  return result;
};

export const showTeamById = async (id: string) => {
  const result = await teamsModel.findByPk(id);
  return result;
};
