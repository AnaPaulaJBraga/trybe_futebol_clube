import Clubs from '../database/models/clubs';
import Match from '../database/models/matchs';
import IMatch from '../interfaces/Match';

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

const create = async ({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress }: IMatch) => {
  const newMatch = await Match.create({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
  });
  return newMatch;
};

const update = async (id: number) => {
  await Match.update(
    { inProgress: false },
    { where: { id } },
  );
};

export default {
  getAllMatchs,
  getMatchsInProgress,
  create,
  update,
};
