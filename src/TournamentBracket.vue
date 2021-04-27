<template>
  <div class="vt-wrapper" v-if="recursiveBracket">
    <BracketNode
      :bracket-node="recursiveBracket"
      @onSelectedTeam="highlightTeam"
      @onDeselectedTeam="unhighlightTeam"
      :highlighted-team-id="highlightedTeamId"
    >
    </BracketNode>
  </div>
</template>

<script lang="ts">
import IRound from "./interface/IRound";
import BracketNode from "./components/BracketNode.vue";
import * as recursiveBracket from "./recursiveBracket";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    BracketNode,
  },
})
export default class TournamentBracket extends Vue {
  @Prop({ type: Array, default: [] }) private rounds!: IRound[];
  private highlightedTeamId: string | undefined = "";

  private highlightTeam(id: string): void {
    this.highlightedTeamId = id;
  }

  private unhighlightTeam(): void {
    this.highlightedTeamId = undefined;
  }

  get recursiveBracket(): any {
    const copyRound = this.rounds;

    return recursiveBracket.transform(copyRound);
  }
}
</script>

<style>
.vt-wrapper {
  display: flex;
}
</style>