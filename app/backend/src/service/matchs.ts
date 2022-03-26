import Clubs from '../database/models/clubs';
import Match from '../database/models/matchs';

const getAllMatchs = async () => {
  const matchs = await Match.findAll({
    attributes: { exclude: ['home_team', 'away_team'] },
    include: [
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
    ],
  });
  return matchs;
};

const getMatchsInProgress = async (query : boolean) => {
  const matchsInProgress = await Match.findAll({
    where: { inProgress: query },
    attributes: { exclude: ['home_team', 'away_team'] },
    include: [
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
    ],
  });
  return matchsInProgress;
};

export default {
  getAllMatchs,
  getMatchsInProgress,
};
