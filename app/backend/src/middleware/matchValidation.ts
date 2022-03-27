import { Request, Response, NextFunction } from 'express';
import Clubs from '../database/models/clubs';
import statusCode from '../database/enums/status';

const validateTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res
      .status(statusCode.HTTP_UNAUTHORIZED)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  return next();
};

const validateMatchs = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const haveHomeTeam = await Clubs.findByPk(homeTeam);
  const haveAwayTeam = await Clubs.findByPk(awayTeam);

  if (!haveHomeTeam || !haveAwayTeam) {
    return res
      .status(statusCode.HTTP_UNAUTHORIZED)
      .json({ message: 'There is no team with such id!' });
  }
  return next();
};

export {
  validateTeams,
  validateMatchs,
};
