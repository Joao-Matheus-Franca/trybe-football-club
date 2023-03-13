import Teams from '../models/teamsModel';
import Matches from '../models/matchesModel';

const leaderboardHome = async () => {
  const allTeams = await Teams.findAll();
  const allMatches = await Matches.findAll();

  const leaderboard = allTeams.map((t) => {
    const matches = allMatches.filter((m) => m.homeTeamId === t.id && m.inProgress === false);
    const winMatches = matches.filter((m) => Number(m.homeTeamGoals) > Number(m.awayTeamGoals));
    const drawMatches = matches.filter((m) => Number(m.homeTeamGoals) === Number(m.awayTeamGoals));
    return {
      name: t.teamName,
      totalPoints: (winMatches.length * 3) + drawMatches.length,
      totalGames: matches.length,
      totalVictories: winMatches.length,
      totalDraws: drawMatches.length,
      totalLosses: matches.length - winMatches.length - drawMatches.length,
      goalsFavor: matches.reduce((acc, crr) => acc + crr.homeTeamGoals, 0),
      goalsOwn: matches.reduce((acc, crr) => acc + crr.awayTeamGoals, 0),
    };
  });

  return leaderboard;
};

export default leaderboardHome;
