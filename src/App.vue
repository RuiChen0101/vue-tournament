<template>
  <TournamentBracket :rounds="rounds" @onMatchClick="onMatchClick" />
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
          id: "match1",
          winner: "1",
          team1: { id: "1", name: "Competitor 1", score: 2 },
          team2: { id: "2", name: "Competitor 2", score: 1 },
        },
        {
          id: "match2",
          winner: "4",
          team1: { id: "3", name: "Competitor 3", score: 0 },
          team2: { id: "4", name: "Competitor 4", score: 2 },
        },
        {
          id: "match3",
          winner: "5",
          team1: { id: "5", name: "Competitor 5", score: 2 },
          team2: { id: "6", name: "Competitor 6", score: 1 },
        },
        {
          id: "match4",
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
          id: "match5",
          winner: "4",
          team1: { id: "1", name: "Competitor 1", score: 1 },
          team2: { id: "4", name: "Competitor 4", score: 2 },
        },
        {
          id: "match6",
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
          id: "any_match_id",
          winner: "8",
          team1: { id: "4", name: "Competitor 4", score: 1 },
          team2: { id: "8", name: "Competitor 8", score: 3 },
        },
      ],
    },
  ];

  private onMatchClick(matchId: string | number): void {
    alert(`click: ${matchId}`);
  }
}
</script>
