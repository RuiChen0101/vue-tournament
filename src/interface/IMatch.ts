import ITeam from "./ITeam";

export default interface IMatch {
    title?: string;
    winner?: string | number;
    team1: ITeam;
    team2: ITeam;
}