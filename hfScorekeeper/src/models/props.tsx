export class GameProps {
  public playerCount!: number;
  public teamCount!: number;
  public teams: Array<TeamProps> = [];
}

class TeamProps {
  public name!: string;
  public score!: number;
  public opener!: number;
  public members!: Array<string>;
  public id!: number;
}
