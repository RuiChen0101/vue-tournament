import * as factory from 'tods-competition-factory';

export const generateBracket = (drawSize: number) => {
  const { tournamentRecord } = factory.mocksEngine.generateTournamentRecord({
    drawProfiles: [{ drawSize, matchUpFormat: 'SET1-S:T20' }],
    completeAllMatchUps: true
  });
  factory.tournamentEngine.setState(tournamentRecord);
  const { matchUps } = factory.tournamentEngine.allTournamentMatchUps();
  const { roundMatchUps } = factory.drawEngine.getRoundMatchUps({ matchUps });
  return Object.values(roundMatchUps).map((matchUps: any) => {
    const matchs = matchUps.map((matchUp: any) => {
      const score = matchUp.score?.sets?.[0];
      const winningSide = matchUp.sides.find((side: any) => side.sideNumber === matchUp.winningSide);
      const teams = matchUp.sides.map((side: any, i: number) => ({
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