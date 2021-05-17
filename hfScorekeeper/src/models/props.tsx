export class GameProps {
  public playerCount!: number;
  public teamCount!: number;
  public teams: Array<TeamProps> = [];
}

class TeamProps {
  public name!: string;
  public score!: number;
  public opener: number = 50;
  public members!: Array<string>;
}
