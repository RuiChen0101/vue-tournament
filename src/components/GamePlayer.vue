<template>
  <div class="vtb-item-players">
    <div>
      <div
        :class="[
          'vt-player',
          'vt-player1',
          getPlayerClass(bracketNode.player1),
        ]"
        @mouseover="highlightPlayer(bracketNode.player1.id)"
        @mouseleave="unhighlightPlayer"
      >
        <slot :player="bracketNode.player1" name="player" />
      </div>

      <div
        :class="[
          'vt-player',
          'vt-player2',
          getPlayerClass(bracketNode.player2),
        ]"
        @mouseover="highlightPlayer(bracketNode.player2.id)"
        @mouseleave="unhighlightPlayer"
      >
        <slot :player="bracketNode.player2" name="player" />
      </div>
    </div>
    <slot name="player-extension-bottom" :match="matchProperties" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GamePlayer extends Vue {
  @Prop({ type: Object, default: {} }) bracketNode!: any;
  @Prop({ type: String, default: undefined }) highlightedPlayerId!: string;

  get matchProperties(): any {
    return Object.assign({}, this.bracketNode, {
      games: undefined,
      hasParent: undefined,
    });
  }

  private getPlayerClass(player: any): string {
    if (player.winner === null || player.winner === undefined) {
      return "";
    }

    let clazz = player.winner ? "winner" : "defeated";

    if (this.highlightedPlayerId === player.id) {
      clazz += " highlight";
    }

    return clazz;
  }
  highlightPlayer(playerId: string): void {
    this.$emit("onSelectedPlayer", playerId);
  }
  unhighlightPlayer(): void {
    this.$emit("onDeselectedPlayer");
  }
}
</script>
