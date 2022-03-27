import Clubs from '../database/models/clubs';
import Match from '../database/models/matchs';

const getAllMatchs = async () => {
  const matchs = await Match.findAll({
    include: [
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
    ],
  });
  return matchs;
};

const getMatchsInProgress = async (inProgress: string) => {
  let where = {};

  if (inProgress === 'false') where = { inProgress: false };
  if (inProgress === 'true') where = { inProgress: true };

  const matchsInProgress = await Match.findAll({
    where,
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
