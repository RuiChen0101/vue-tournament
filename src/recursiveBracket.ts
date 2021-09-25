import IMatch from "./interface/IMatch";
import IRound from "./interface/IRound";
import IBracketNode from "./interface/IBracketNode";

export const transform = (rounds: IRound[]): IBracketNode | undefined => {
    if (!rounds) {
        return undefined;
    }

    const totalRounds = rounds.length;

    let currentRound: IBracketNode[] = [];
    let previousRound: IBracketNode[] = [];
    let totalMatchCounter = 0;
    for (let i = 0; i < totalRounds; i++) {
        currentRound = rounds[i].matchs.map((match: IMatch) => {
            totalMatchCounter++;
            match.id = match.id ?? totalMatchCounter;
            match.title = match.title ?? String(totalMatchCounter);
            return {
                match: match,
                children: [],
                hasParent: !!rounds[i + 1],
            };
        });

        if (previousRound.length === 0) {
            previousRound = currentRound;
            continue;
        }

        for (let j = 0; j < previousRound.length; j++) {
            const matchForCurrentGame = Math.floor(j / 2);
            currentRound[matchForCurrentGame].children.push(previousRound[j]);
        }

        previousRound = currentRound;
    }

    return currentRound[0] || undefined;
}