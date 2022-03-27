import { NextFunction, Request, Response } from 'express';
import matchs from '../service/matchs';

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

export default {
  getAllMatchs,
};
