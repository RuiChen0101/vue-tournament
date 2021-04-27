<template>
  <div class="vt-item" v-if="playersArePresent">
    <div :class="getBracketNodeClass(bracketNode)">
      <GamePlayer
        :bracket-node="bracketNode"
        :highlighted-player-id="highlightedPlayerId"
        @onSelectedPlayer="highlightPlayer"
        @onDeselectedPlayer="unhighlightPlayer"
      >
        <template #player="{ player }">
          <slot name="player" :player="player" />
        </template>
        <template #player-extension-bottom="{ match }">
          <slot name="player-extension-bottom" :match="match" />
        </template>
      </GamePlayer>
    </div>

    <div
      v-if="bracketNode.games[0] || bracketNode.games[1]"
      class="vt-item-children"
    >
      <div class="vt-item-child" v-if="bracketNode.games[0]">
        <BracketNode
          :bracket-node="bracketNode.games[0]"
          :highlighted-player-id="highlightedPlayerId"
          @onSelectedPlayer="highlightPlayer"
          @onDeselectedPlayer="unhighlightPlayer"
        >
          <template #player="{ player }">
            <slot name="player" :player="player" />
          </template>
          <template #player-extension-bottom="{ match }">
            <slot name="player-extension-bottom" :match="match" />
          </template>
        </BracketNode>
      </div>
      <div class="vt-item-child" v-if="bracketNode.games[1]">
        <BracketNode
          :bracket-node="bracketNode.games[1]"
          :highlighted-player-id="highlightedPlayerId"
          @onSelectedPlayer="highlightPlayer"
          @onDeselectedPlayer="unhighlightPlayer"
        >
          <template #player="{ player }">
            <slot name="player" :player="player" />
          </template>
          <template #player-extension-bottom="{ match }">
            <slot name="player-extension-bottom" :match="match" />
          </template>
        </BracketNode>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GamePlayer from "./GamePlayer.vue";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    GamePlayer,
  },
})
export default class BracketNode extends Vue {
  @Prop({ type: Object, default: {} }) bracketNode!: any;
  @Prop({ type: String, default: undefined }) highlightedPlayerId!: string;

  get playersArePresent(): any {
    return this.bracketNode.player1 && this.bracketNode.player1;
  }

  private getBracketNodeClass(bracketNode: any): string {
    if (bracketNode.games[0] || bracketNode.games[1]) {
      return "vt-item-parent";
    }

    if (bracketNode.hasParent) {
      return "vt-item-child";
    }

    return "";
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

  private highlightPlayer(playerId: string): void {
    this.$emit("onSelectedPlayer", playerId);
  }

  private unhighlightPlayer(): void {
    this.$emit("onDeselectedPlayer");
  }
}
</script>

<style>
.vt-item {
  display: flex;
  flex-direction: row-reverse;
}

.vt-item p {
  padding: 20px;
  margin: 0;
  background-color: #999999;
}

.vt-item-parent {
  position: relative;
  margin-left: 50px;
  display: flex;
  align-items: center;
}

.vt-item-players {
  flex-direction: column;
  background-color: #999999;
  margin: 0;
  color: white;
}

.vt-item-players .vt-player {
  padding: 10px;
}

.vt-item-players .winner {
  background-color: darkgreen;
}

.vt-item-players .defeated {
  background-color: firebrick;
}

.vt-item-players .winner.highlight {
  background-color: darkseagreen;
}

.vt-item-players .defeated.highlight {
  background-color: indianred;
}

.vt-item-parent:after {
  position: absolute;
  content: "";
  width: 25px;
  height: 2px;
  left: 0;
  top: 50%;
  background-color: gray;
  transform: translateX(-100%);
}

.vt-item-children {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.vt-item-child {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
}

.vt-item-child:before {
  content: "";
  position: absolute;
  background-color: gray;
  right: 0;
  top: 50%;
  transform: translateX(100%);
  width: 25px;
  height: 2px;
}

.vt-item-child:after {
  content: "";
  position: absolute;
  background-color: gray;
  right: -25px;
  height: calc(50% + 22px);
  width: 2px;
  top: 50%;
}

.vt-item-child:last-child:after {
  transform: translateY(-100%);
}

.vt-item-child:only-child:after {
  display: none;
}
</style>
