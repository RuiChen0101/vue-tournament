<template>
  <TournamentBracket
    :rounds="rounds"
    format="default"
    @onMatchClick="onMatchClick"
  />
</template>

<script lang="ts">
import IRound from "./interface/IRound";
import { Component, Vue } from "vue-property-decorator";

import TournamentBracket from "./TournamentBracket.vue";

import bracketData from "./mockData/singleElimination8WithFeedIn.json";

@Component({
  components: {
    TournamentBracket,
  },
})
export default class App extends Vue {
  rounds: IRound[] = bracketData;

  private onMatchClick(matchId: string | number): void {
    alert(`click: ${matchId}`);
  }
}
</script>
