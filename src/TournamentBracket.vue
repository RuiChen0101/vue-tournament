<template>
  <div class="vt-wrapper" v-if="recursiveBracket">
    <BracketNode
      :bracket-node="recursiveBracket"
      @onSelectedPlayer="highlightPlayer"
      @onDeselectedPlayer="unhighlightPlayer"
      :highlighted-player-id="highlightedPlayerId"
    >
      <template #player="{ player }">
        <slot name="player" :player="player" />
      </template>
      <template #player-extension-bottom="{ match }">
        <slot name="player-extension-bottom" :match="match" />
      </template>
    </BracketNode>
  </div>
</template>

<script lang="ts">
import BracketNode from "./components/BracketNode.vue";
import * as recursiveBracket from "./components/recursiveBracket";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    BracketNode,
  },
})
export default class TournamentBracket extends Vue {
  @Prop({ type: Array, default: [] }) private rounds!: any[];
  @Prop({ type: Array, default: null }) private flatTree!: any[];
  private highlightedPlayerId?: string;

  private highlightPlayer(id: string): void {
    this.highlightedPlayerId = id;
  }

  private unhighlightPlayer(): void {
    this.highlightedPlayerId = undefined;
  }

  get recursiveBracket(): any {
    const copyRound = this.rounds;
    const copyFlatTree = this.flatTree;
    if (this.flatTree) {
      return recursiveBracket.transformFlatTree(copyFlatTree);
    }

    return recursiveBracket.transform(copyRound);
  }
}
</script>

<style>
.vt-wrapper {
  display: flex;
}
</style>