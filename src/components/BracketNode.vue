<template>
  <div class="vt-item" v-if="teamsArePresent">
    <div :class="getBracketNodeClass(bracketNode)">
      <GameMatch
        :match="bracketNode"
        :highlighted-team-id="highlightedTeamId"
        @onSelectedTeam="highlightTeam"
        @onDeselectedTeam="unhighlightTeam"
      >
      </GameMatch>
    </div>

    <div
      v-if="bracketNode.games[0] || bracketNode.games[1]"
      class="vt-item-children"
    >
      <div class="vt-item-child" v-if="bracketNode.games[0]">
        <BracketNode
          :bracket-node="bracketNode.games[0]"
          :highlighted-team-id="highlightedTeamId"
          @onSelectedTeam="highlightTeam"
          @onDeselectedTeam="unhighlightTeam"
        >
        </BracketNode>
      </div>
      <div class="vt-item-child" v-if="bracketNode.games[1]">
        <BracketNode
          :bracket-node="bracketNode.games[1]"
          :highlighted-team-id="highlightedTeamId"
          @onSelectedTeam="highlightTeam"
          @onDeselectedTeam="unhighlightTeam"
        >
        </BracketNode>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GameMatch from "./GameMatch.vue";

import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  components: {
    GameMatch,
  },
})
export default class BracketNode extends Vue {
  @Prop({ type: Object, default: {} }) bracketNode!: any;
  @Prop({ type: String, default: undefined }) highlightedTeamId!: string;

  get teamsArePresent(): any {
    return this.bracketNode.team1 && this.bracketNode.team2;
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

  private highlightTeam(playerId: string): void {
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

.vt-item-teams {
  flex-direction: column;
  margin: 0;
  color: white;
}

.vt-item-teams .vt-team {
  display: flex;
  font-size: 10px;
  width: 140px;
  background-color: #59595e;
}

.vt-item-teams .vt-team .name {
  padding: 3px 0px 3px 6px;
  font-size: 10px;
  width: 110px;
  text-overflow: ellipsis;
}

.vt-item-teams .vt-team .score {
  margin-left: auto;
  padding: 3px;
  font-size: 12px;
  width: 20px;
  text-align: center;
  background-color: #787a7f;
}

.vt-item-teams .vt-team.winner .score {
  background-color: #ee7b3c;
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

.vt-item-teams .vt-team.highlight {
  background-color: #222222;
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
