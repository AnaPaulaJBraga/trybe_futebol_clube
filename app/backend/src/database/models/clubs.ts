import { Model, DataTypes } from 'sequelize';
import db from '.';

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
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Clubs',
  tableName: 'clubs',
  timestamps: false,
});

export default Clubs;
