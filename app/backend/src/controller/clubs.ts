import { Request, Response } from 'express';
import * as clubsService from '../service/clubs';

export async function getAllClubs(_req: Request, res: Response): Promise<void> {
  const clubs = await clubsService.getAllClubs();
  res.status(clubs.status).json(clubs.response);
}

export async function getClubsById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const club = await clubsService.getClubsById(+id);
  res.status(club.status).json(club.response);
}