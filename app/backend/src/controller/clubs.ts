import { Request, Response } from 'express';
import * as clubsService from '../service/clubs';

export async function getAllClubs(_req: Request, res: Response): Promise<void> {
  const clubs = await clubsService.getAllClubs();

  res.status(200).json(clubs);
}

export async function getClubsById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const idClub = await clubsService.getClubsById(+id);

  res.status(200).json(idClub);
}
