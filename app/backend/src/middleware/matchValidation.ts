import { Request, Response, NextFunction } from 'express';

const statusCode = {
  HTTP_OK: 200,
  HTTP_UNAUTHORIZED: 401,
};

const validateMatchTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) {
    return res
      .status(statusCode.HTTP_UNAUTHORIZED)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  return next();
};

export default {
  validateMatchTeams,
};
