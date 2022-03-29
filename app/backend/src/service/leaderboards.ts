import * as clubsService from './clubs';
import * as matchService from './matchs';
import Clubs from '../database/models/clubs';
import ILeaderboard from '../interfaces/Leaderboard';

const clubsLeaderboard = (clubs: Clubs[]) => {
  const leaderboard: ILeaderboard[] = [];
  clubs.forEach((club) => {
    leaderboard.push({
      name: club.clubName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 100,
    });
  });
  return leaderboard;
};

const leaderboardHomeTeam = (match: any, leaderboard: ILeaderboard[]) =>
  leaderboard.forEach((club) => {
    const team = club;
    if (match.homeClub.clubName === club.name) {
      team.totalGames += 1;
      team.totalDraws += 1;
      team.totalPoints += 1;
      team.goalsFavor += match.homeTeamGoals;
      team.goalsOwn += match.awayTeamGoals;
      team.efficiency = +(
        (team.totalPoints / (team.totalGames * 3))
        * 100
      ).toFixed(2);
    }
  });

const winAwayTeam = (match: any, leaderboard: ILeaderboard[]) =>
  leaderboard.forEach((club) => {
    const team = club;
    if (match.homeClub.clubName === club.name) {
      team.totalGames += 1;
      team.totalLosses += 1;
      team.goalsFavor += match.homeTeamGoals;
      team.goalsOwn += match.awayTeamGoals;
      team.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
      team.efficiency = +(
        (team.totalPoints / (team.totalGames * 3))
        * 100
      ).toFixed(2);
    }
  });

const winHomeTeam = (match: any, leaderboard: ILeaderboard[]) =>
  leaderboard.forEach((club) => {
    const team = club;
    if (match.homeClub.clubName === club.name) {
      team.totalGames += 1;
      team.totalVictories += 1;
      team.totalPoints += 3;
      team.goalsFavor += match.homeTeamGoals;
      team.goalsOwn += match.awayTeamGoals;
      team.goalsBalance += match.homeTeamGoals - match.awayTeamGoals;
      team.efficiency = +(
        (team.totalPoints / (team.totalGames * 3))
        * 100
      ).toFixed(2);
    }
  });

const ranking = (leaderboard: ILeaderboard[]) =>
  leaderboard.sort((teamA, teamB) => {
    if (teamB.totalPoints < teamA.totalPoints) return -1;
    if (teamB.totalPoints > teamA.totalPoints) return 1;
    if (teamB.totalVictories < teamA.totalVictories) return -1;
    if (teamB.totalVictories > teamA.totalVictories) return 1;
    if (teamB.goalsBalance < teamA.goalsBalance) return -1;
    if (teamB.goalsBalance > teamA.goalsBalance) return 1;
    if (teamB.goalsFavor < teamA.goalsFavor) return -1;
    if (teamB.goalsFavor > teamA.goalsFavor) return 1;
    if (teamB.goalsOwn < teamA.goalsOwn) return -1;
    if (teamB.goalsOwn > teamA.goalsOwn) return 1;
    return 0;
  });

const getAllLeaderboard = async () => {
  const matchs = await matchService.getAllMatchs();
  const clubs = await clubsService.getAllClubs();

  const leaderboard = clubsLeaderboard(clubs);

  matchs.forEach((match) => {
    if (!match.inProgress) {
      const result = match.homeTeamGoals - match.awayTeamGoals;

      if (result === 0) return leaderboardHomeTeam(match, leaderboard);
      if (result < 0) return winAwayTeam(match, leaderboard);
      return winHomeTeam(match, leaderboard);
    }
  });

  return ranking(leaderboard);
};

export default { getAllLeaderboard };
