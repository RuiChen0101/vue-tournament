# vue-tournament

Tournament brackets generator using Vue.

base on [vue-tournament-bracket](https://github.com/kamilwylegala/vue-tournament-bracket) and combine ui style of [eact-tournament-bracket](https://github.com/moodysalem/react-tournament-bracket)

![example](./image/example.png)

## Installation and component usage

Install component via:
```
npm install vue-tournament
```

Example:
```html
<template>
  <TournamentBracket :rounds="rounds" />
</template>

<script lang="ts">
import IRound from "./interface/IRound";

import { Component, Vue } from "vue-property-decorator";
import TournamentBracket from "./TournamentBracket.vue";

@Component({
  components: {
    TournamentBracket,
  },
})
export default class App extends Vue {
  rounds: IRound[] = [
    //Quarter
    {
      matchs: [
        {
          winner: "1",
          team1: { id: "1", name: "Competitor 1", score: 2 },
          team2: { id: "2", name: "Competitor 2", score: 1 },
        },
        {
          winner: "4",
          team1: { id: "3", name: "Competitor 3", score: 0 },
          team2: { id: "4", name: "Competitor 4", score: 2 },
        },
        {
          winner: "5",
          team1: { id: "5", name: "Competitor 5", score: 2 },
          team2: { id: "6", name: "Competitor 6", score: 1 },
        },
        {
          winner: "8",
          team1: { id: "7", name: "Competitor 7", score: 0 },
          team2: { id: "8", name: "Competitor 8", score: 2 },
        },
      ],
    },
    //Semi
    {
      matchs: [
        {
          winner: "4",
          team1: { id: "1", name: "Competitor 1", score: 1 },
          team2: { id: "4", name: "Competitor 4", score: 2 },
        },
        {
          winner: "8",
          team1: { id: "5", name: "Competitor 5", score: 1 },
          team2: { id: "8", name: "Competitor 8", score: 2 },
        },
      ],
    },
    //Final
    {
      matchs: [
        {
          winner: "8",
          team1: { id: "4", name: "Competitor 4", score: 1 },
          team2: { id: "8", name: "Competitor 8", score: 3 },
        },
      ],
    },
  ];
}
</script>

```

## Development

Checkout repository and:
```
npm install
npm run serve
```

Then open browser and test your changes using `App.vue` main component for development purposes.

See `package.json` to discover available commands.

## Releasing

```
npm test
npm run eslint
npm run build
git commit
npm version <version>
git push
npm publish --access=public
```

## License

MIT