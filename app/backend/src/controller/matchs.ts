import { Request, Response, NextFunction } from 'express';
import matchs from '../service/matchs';

const getAllMatchs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allMatchs = await matchs.getAllMatchs();
    res.status(200).json(allMatchs);
  } catch (error) {
    next();
  }
};

const getMatchsByQuery = async (req: Request, res: Response, inProgress: string) => {
  let query;
  if (inProgress === 'true') query = true;
  else query = false;

  const matchsProgress = await matchs.getMatchsByQuery(query);
  return res.status(200).json(matchsProgress);
};

export default {
  getAllMatchs,
  getMatchsByQuery,
};
