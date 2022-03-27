import { NextFunction, Request, Response } from 'express';
import * as clubsService from '../service/clubs';

const getAllClubs = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const clubs = await clubsService.getAllClubs();

    return res.status(200).json(clubs);
  } catch (error) {
    next(error);
  }
};

const getClubsById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const idClub = await clubsService.getClubsById({ id });
    return res.status(200).json(idClub);
  } catch (error) {
    next(error);
  }
};

export {
  getAllClubs,
  getClubsById,
};
