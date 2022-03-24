import { Request, Response, NextFunction } from 'express';
import * as clubsService from '../service/clubs';

export async function getAllClubs(_req: Request, res: Response, next: NextFunction) {
  try {
    const clubs = await clubsService.getAllClubs();
    return res.status(200).json(clubs).end();
  } catch (error) {
    next();
  }
}

export async function getClubsById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const club = await clubsService.getClubsById(+id);
    res.status(200).json(club);
  } catch (error) {
    next();
  }
}
