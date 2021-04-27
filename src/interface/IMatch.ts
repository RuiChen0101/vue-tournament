import ITeam from "./ITeam";

export default interface IMatch {
    winner?: string | number;
    team1: ITeam;
    team2: ITeam;
}