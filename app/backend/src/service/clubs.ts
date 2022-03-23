import Clubs from '../database/models/clubs';

export async function getAllClubs() {
  const clubs = await Clubs.findAll({ raw: true });
  return { status: 200, response: clubs };
}

export async function getClubsById(id: number): Promise<any> {
  const club = await Clubs.findOne({
    raw: true,
    where: { id },
  });
  return { status: 200, response: club };
}
