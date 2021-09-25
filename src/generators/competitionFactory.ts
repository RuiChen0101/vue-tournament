import * as factory from 'tods-competition-factory';

export const generateBracket = (drawSize: number) => {
    const { tournamentRecord } = factory.mocksEngine.generateTournamentRecord({
        drawProfiles: [{ drawSize, matchUpFormat: 'SET1-S:T20' }],
        completeAllMatchUps: true
    });
    factory.tournamentEngine.setState(tournamentRecord);
    const { matchUps } = factory.tournamentEngine.allTournamentMatchUps();
    const { roundMatchUps } = factory.drawEngine.getRoundMatchUps({ matchUps });
    return roundMatchUps;
}