import Clubs from '../database/models/clubs';
import Match from '../database/models/matchs';

const getAllMatchs = async () => {
  const matchs = await Match.findAll({
    attributes: { exclude: ['home_team', 'away_team'] },
    include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
    ],
  });
  return matchs;
};

const getMatchsByQuery = async (query: boolean): Promise<any> => {
  const matchsQuery = await Match.findAll({
    where: { inProgress: query },
    attributes: { exclude: ['home_team', 'away_team'] },
    include: [
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
    ],
  });

  return matchsQuery;
};

export default {
  getAllMatchs,
  getMatchsByQuery,
};
