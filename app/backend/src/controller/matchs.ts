import { NextFunction, Request, Response } from 'express';
import matchs from '../service/matchs';
import statusCode from '../database/enums/status';

const getAllMatchs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { inProgress } = req.query;
    if (!inProgress) {
      const getAll = await matchs.getAllMatchs();
      return res.status(200).json(getAll);
    }

    const getMatchInProgress = matchs.getMatchsInProgress(inProgress as string);
    return res.status(200).json(getMatchInProgress);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

  try {
    const newMatch = await matchs.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });
    return res.status(statusCode.HTTP_CREATED).json(newMatch);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllMatchs,
  create,
};
