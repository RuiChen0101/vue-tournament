<template>
  <div class="vt-item-teams">
    <div>
      <div class="title">
        <span>{{ bracketNode.match.title }}</span>
      </div>
      <div
        :class="[
          'vt-team',
          'vt-team-top',
          getPlayerClass(bracketNode.match.team1),
        ]"
        @mouseover="highlightTeam(bracketNode.match.team1.id)"
        @mouseleave="unhighlightTeam"
      >
        <span class="name">{{ bracketNode.match.team1.name }}</span>
        <span class="score">{{ bracketNode.match.team1.score }}</span>
      </div>

      <div
        :class="[
          'vt-team',
          'vt-team-bot',
          getPlayerClass(bracketNode.match.team2),
        ]"
        @mouseover="highlightTeam(bracketNode.match.team2.id)"
        @mouseleave="unhighlightTeam"
      >
        <span class="name">{{ bracketNode.match.team2.name }}</span>
        <span class="score">{{ bracketNode.match.team2.score }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ITeam from "@/interface/ITeam";
import IBracketNode from "../interface/IBracketNode";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GameMatch extends Vue {
  @Prop({ type: Object, default: {} }) bracketNode!: IBracketNode;
  @Prop({ type: String, default: undefined }) highlightedTeamId!: string;

  private getPlayerClass(team: ITeam): string {
    let clazz = "";

    if (
      this.bracketNode.match?.winner !== undefined &&
      team.id === this.bracketNode.match?.winner
    ) {
      clazz = "winner";
    }

    if (this.highlightedTeamId === team.id) {
      clazz += " highlight";
    }

    return clazz;
  }

  highlightTeam(playerId: string): void {
    this.$emit("onSelectedTeam", playerId);
  }

  unhighlightTeam(): void {
    this.$emit("onDeselectedTeam");
  }
}
</script>
