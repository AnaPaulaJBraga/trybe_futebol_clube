import IClubId from '../interfaces/Club';
import Clubs from '../database/models/clubs';

const getAllClubs = async () => {
  const clubs = await Clubs.findAll({ raw: true });
  return clubs;
};

const getClubsById = async ({ id }: IClubId) => {
  const club = await Clubs.findByPk(id);
  return club;
};

export {
  getClubsById,
  getAllClubs,
};
