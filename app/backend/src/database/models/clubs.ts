import { Model, DataTypes } from 'sequelize';
import db from '.';
import Match from './matchs';

class Clubs extends Model {
  public id: number;

  public clubName: string;
}

Clubs.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  clubName: {
    field: 'club_name',
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
  tableName: 'clubs',
  timestamps: false,
});

Clubs.hasMany(Match, {
  foreignKey: 'id', as: 'matchs', constraints: false,
});

export default Clubs;
