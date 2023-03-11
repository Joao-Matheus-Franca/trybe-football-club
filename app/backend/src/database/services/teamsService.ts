import teamsModel from '../models/teamsModel';

const showAllTeams = async () => {
  const [result] = await teamsModel.findAll();
  return result;
};

export default showAllTeams;
