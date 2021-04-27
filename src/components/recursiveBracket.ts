function constructTree(tree: any, mapOfChildren: any, processedRound: any): any {
    const totalChildren = mapOfChildren[tree.id] || [];

    tree.title = "round " + processedRound;

    for (let i = 0; i < totalChildren.length; i++) {
        const childGame = totalChildren[i];

        const treeChild = {
            ...childGame,
            title: `round ${[processedRound]}`,
            hasParent: true,
            games: [],
        };

        constructTree(treeChild, mapOfChildren, processedRound - 1);

        tree.games.push(treeChild);
    }

    return tree;
}

export const transform = (rounds: any): any => {
    if (!rounds) {
        return null;
    }

    const totalRounds = rounds.length;

    let currentRound = [];
    let previousRound = [];

    for (let i = 0; i < totalRounds; i++) {
        currentRound = rounds[i].games.map((game: any) => {
            return {
                ...game,
                title: "round " + i,
                games: [],
                hasParent: !!rounds[i + 1],
            };
        });

        if (previousRound.length === 0) {
            previousRound = currentRound;
            continue;
        }

        for (let j = 0; j < previousRound.length; j++) {
            const matchForCurrentGame = Math.floor(j / 2);
            currentRound[matchForCurrentGame].games.push(previousRound[j]);
        }

        previousRound = currentRound;
    }

    return currentRound[0] || null;
}

export const transformFlatTree = (games: any): any => {
    const mapOfGamesPerParent: any = {};
    let root: any = null;

    games.forEach((game: any) => {
        if (!game.next && !root) {
            root = game;
            return;
        }

        if (!mapOfGamesPerParent[game.next]) {
            mapOfGamesPerParent[game.next] = [];
        }

        mapOfGamesPerParent[game.next].push(game);
    });

    const tree = {
        ...root,
        title: "round",
        games: [],
        hasParent: false,
    };

    return constructTree(tree, mapOfGamesPerParent, Object.keys(mapOfGamesPerParent).length);
}