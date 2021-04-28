import ITeam from "./ITeam";

export default interface IMatch {
    id?: string | number;
    title?: string;
    winner?: string | number;
    team1: ITeam;
    team2: ITeam;
}