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
  home_team: {
    type: DataTypes.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'clubs',
      key: 'id',
    },
  },
  home_team_goals: {
    type: DataTypes.INTEGER,
  },
  away_team: {
    type: DataTypes.INTEGER,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'clubs',
      key: 'id',
    },
  },
  away_team_goals: {
    type: DataTypes.INTEGER,
  },
  in_progress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Matchs',
  tableName: 'matchs',
  timestamps: false,
});

Match.belongsTo(Clubs, { foreignKey: 'id', as: 'clubs' });

Clubs.hasMany(Match, { foreignKey: 'id', as: 'matchs' });

export default Match;
