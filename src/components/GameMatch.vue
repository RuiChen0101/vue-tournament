<template>
  <div class="vt-item-teams">
    <div>
      <div
        :class="['vt-team', 'vt-team-top', getPlayerClass(match.team1)]"
        @mouseover="highlightTeam(match.team1.id)"
        @mouseleave="unhighlightTeam"
      >
        <span class="name">{{ match.team1.name }}</span>
        <span class="score">{{ match.team1.score }}</span>
      </div>

      <div
        :class="['vt-team', 'vt-team-bot', getPlayerClass(match.team2)]"
        @mouseover="highlightTeam(match.team2.id)"
        @mouseleave="unhighlightTeam"
      >
        <span class="name">{{ match.team2.name }}</span>
        <span class="score">{{ match.team2.score }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ITeam from "@/interface/ITeam";
import IMatch from "@/interface/IMatch";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GameMatch extends Vue {
  @Prop({ type: Object, default: {} }) match!: IMatch;
  @Prop({ type: String, default: undefined }) highlightedTeamId!: string;

  private getPlayerClass(team: ITeam): string {
    let clazz = "";

    if (this.match.winner !== undefined && team.id === this.match.winner) {
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
