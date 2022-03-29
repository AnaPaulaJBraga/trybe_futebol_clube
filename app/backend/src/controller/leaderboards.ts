import { Request, Response, NextFunction } from 'express';
import leaderboards from '../service/leaderboards';

const getAllLeaderboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderboard = await leaderboards.getAllLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllLeaderboard,
};
