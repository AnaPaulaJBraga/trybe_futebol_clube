import Clubs from '../database/models/clubs';

export async function getAllClubs() {
  const clubs = await Clubs.findAll({ raw: true });
  return clubs;
}

export async function getClubsById(id: number): Promise<any> {
  const club = await Clubs.findOne({
    raw: true,
    where: { id },
  });
  return club;
}
