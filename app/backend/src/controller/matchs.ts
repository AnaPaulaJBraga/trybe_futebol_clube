import { Request, Response } from 'express';
import matchs from '../service/matchs';

const getMatchInProgress = async (req: Request, res: Response, inProgress: string) => {
  let query;

  if (inProgress === 'true') query = true;
  else query = false;

  const matchsInProgress = await matchs.getMatchsInProgress(query);

  return res.status(201).json(matchsInProgress);
};

const getAllMatchs = async (req: Request, res: Response) => {
  try {
    const { inProgress } = req.query;
    if (!inProgress) {
      const getAll = await matchs.getAllMatchs();
      return res.status(200).json(getAll);
    }

    getMatchInProgress(req, res, String(inProgress));
  } catch (err) {
    return res.status(401).json({ error: `${err}` });
  }
};

export default {
  getAllMatchs,
  getMatchInProgress,
};
