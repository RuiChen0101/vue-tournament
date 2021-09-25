import IMatch from "@/interface/IMatch";
import IRound from "@/interface/IRound";
import ITeam from "@/interface/ITeam";

export const courthiveAdaptor = (roundMatchUps: any): IRound[] => {
    return Object.values(roundMatchUps).map((matchUps: any) => {
        const matchs: IMatch[] = matchUps.map((matchUp: any) => {
            const score = matchUp.score?.sets?.[0];
            const winningSide = matchUp.sides.find((side: any) => side.sideNumber === matchUp.winningSide);
            const teams: ITeam[] = matchUp.sides.map((side: any, i: number) => ({
                id: side.participant.participantId,
                name: side.participant.participantName,
                score: i ? score?.side2Score : score?.side1Score,
            }));
            return {
                id: matchUp.matchUpId,
                winner: winningSide?.participant?.participantId,
                team1: teams[0],
                team2: teams[1],
            };
        });
        return { matchs };
    });
}