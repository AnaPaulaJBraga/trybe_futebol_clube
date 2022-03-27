import { Model, DataTypes } from 'sequelize';
import db from '.';
import Clubs from './clubs';

class Match extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeam: {
    field: 'home_team',
    type: DataTypes.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'clubs',
      key: 'id',
    },
  },
  homeTeamGoals: {
    field: 'home_team_goals',
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    field: 'away_team',
    type: DataTypes.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'clubs',
      key: 'id',
    },
  },
  awayTeamGoals: {
    field: 'away_team_goals',
    type: DataTypes.INTEGER,
  },
  inProgress: {
    field: 'in_progress',
    type: DataTypes.INTEGER,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matchs',
  tableName: 'matchs',
  timestamps: false,
});

Match.belongsTo(Clubs, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Clubs, { foreignKey: 'awayTeam', as: 'awayClub' });

export default Match;
