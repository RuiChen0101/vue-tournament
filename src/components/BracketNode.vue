<template>
  <div class="vt-item" v-if="matchArePresent">
    <div
      v-if="bracketNode.match.feedIn !== undefined"
      :class="getBracketNodeClass(bracketNode)"
    >
      <FeedIn
        :bracket-node="bracketNode"
        :highlighted-team-id="highlightedTeamId"
        @onSelectedTeam="highlightTeam"
        @onDeselectedTeam="unhighlightTeam"
        @onMatchClick="onMatchClick"
      >
      </FeedIn>
    </div>
    <div v-else :class="getBracketNodeClass(bracketNode)">
      <GameMatch
        :bracket-node="bracketNode"
        :highlighted-team-id="highlightedTeamId"
        @onSelectedTeam="highlightTeam"
        @onDeselectedTeam="unhighlightTeam"
        @onMatchClick="onMatchClick"
      >
      </GameMatch>
    </div>

    <div
      v-if="bracketNode.children[0] || bracketNode.children[1]"
      class="vt-item-children"
    >
      <div class="vt-item-child" v-if="bracketNode.children[0]">
        <BracketNode
          :bracket-node="bracketNode.children[0]"
          :highlighted-team-id="highlightedTeamId"
          @onSelectedTeam="highlightTeam"
          @onDeselectedTeam="unhighlightTeam"
          @onMatchClick="onMatchClick"
        >
        </BracketNode>
      </div>
      <div class="vt-item-child" v-if="bracketNode.children[1]">
        <BracketNode
          :bracket-node="bracketNode.children[1]"
          :highlighted-team-id="highlightedTeamId"
          @onSelectedTeam="highlightTeam"
          @onDeselectedTeam="unhighlightTeam"
          @onMatchClick="onMatchClick"
        >
        </BracketNode>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FeedIn from "./FeedIn.vue";
import GameMatch from "./GameMatch.vue";
import IBracketNode from "../interface/IBracketNode";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "BracketNode",
  components: {
    GameMatch,
    FeedIn,
  },
})
export default class BracketNode extends Vue {
  @Prop({ type: Object, default: {} }) bracketNode!: IBracketNode;
  @Prop({ type: String, default: undefined }) highlightedTeamId!: string;

  get matchArePresent(): boolean {
    return this.bracketNode.match !== undefined;
  }

  private getBracketNodeClass(bracketNode: IBracketNode): string {
    if (bracketNode.children[0] || bracketNode.children[1]) {
      return "vt-item-parent";
    }

    if (bracketNode.hasParent) {
      return "vt-item-child";
    }

    return "";
  }

  private onMatchClick(matchId: string | number): void {
    this.$emit("onMatchClick", matchId);
  }

  private highlightTeam(playerId: string | number): void {
    this.$emit("onSelectedTeam", playerId);
  }

  private unhighlightTeam(): void {
    this.$emit("onDeselectedTeam");
  }
}
</script>

<style>
.vt-item {
  display: flex;
  flex-direction: row-reverse;
}

.vt-item-parent {
  position: relative;
  margin-left: 50px;
  display: flex;
  align-items: center;
}

.vt-item-teams {
  flex-direction: column;
  margin-bottom: 16px;
}

.vt-item-teams .title {
  font-size: 8px;
  text-align: left;
}

.vt-item-teams .vt-team {
  display: flex;
  font-size: 10px;
  width: 140px;
}

.vt-item-teams .vt-team .name {
  padding: 3px 6px;
  font-size: 10px;
  width: 110px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vt-item-teams .vt-team .score {
  margin-left: auto;
  padding: 3px;
  font-size: 12px;
  width: 20px;
  text-align: center;
}

.vt-item-teams .vt-team-top .score {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.vt-item-teams .vt-team-bot .score {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.vt-item-teams .vt-team-top {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: 2px solid #414146;
}

.vt-item-teams .vt-team-bot {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.vt-item-parent:after {
  position: absolute;
  content: "";
  width: 25px;
  height: 2px;
  left: 0;
  top: calc(50% - 1px);
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
  top: calc(50% - 1px);
  transform: translateX(100%);
  width: 25px;
  height: 2px;
}

.vt-item-child:after {
  content: "";
  position: absolute;
  background-color: gray;
  right: -25px;
  height: calc(50% + 10px);
  width: 2px;
  top: 50%;
}

.vt-item-child:last-child:after {
  transform: translateY(-100%);
}

.vt-item-child:only-child:after {
  display: none;
}

.vt-item-feedIn {
  flex-direction: column;
  margin-bottom: 16px;
}

.vt-item-feedIn .title {
  font-size: 8px;
  text-align: left;
}

.vt-item-feedIn .vt-feedIn {
  display: flex;
  font-size: 10px;
  width: 140px;
  border-radius: 5px;
}

.vt-item-feedIn .vt-feedIn .name {
  padding: 3px 6px;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
