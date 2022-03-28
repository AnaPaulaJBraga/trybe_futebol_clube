export interface IMatchTeam{
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatch extends IMatchTeam {
  homeTeam: number;
  awayTeam: number;
  inProgress: boolean;
}
