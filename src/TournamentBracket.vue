<template>
  <div class="vt-wrapper" v-if="recursiveBracket" :style="cssVars">
    <BracketNode
      :bracket-node="recursiveBracket"
      :highlighted-team-id="highlightedTeamId"
      @onSelectedTeam="highlightTeam"
      @onDeselectedTeam="unhighlightTeam"
      @onMatchClick="onMatchClick"
    >
    </BracketNode>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import IRound from "./interface/IRound";
import IBracketNode from "./interface/IBracketNode";
import BracketNode from "./components/BracketNode.vue";
import { courthiveAdaptor } from "./adaptor/courthiveAdaptor";
import { transform as transformBracket } from "./recursiveBracket";

@Component({
  components: {
    BracketNode,
  },
})
export default class TournamentBracket extends Vue {
  @Prop({ type: Array, default: [] }) private rounds!: IRound[] | any;
  @Prop({ type: String, default: "default" }) private format!:
    | "default"
    | "courthive";
  @Prop({ type: String, default: "#ffffff" }) private textColor!: string;
  @Prop({ type: String, default: "#9d999d" }) private titleColor!: string;
  @Prop({ type: String, default: "#59595e" })
  private teamBackgroundColor!: string;
  @Prop({ type: String, default: "#222222" })
  private highlightTeamBackgroundColor!: string;
  @Prop({ type: String, default: "#787a7f" })
  private scoreBackgroundColor!: string;
  @Prop({ type: String, default: "#ee7b3c" })
  private winnerScoreBackgroundColor!: string;

  private highlightedTeamId: string | undefined = "";

  private onMatchClick(matchId: string | number): void {
    this.$emit("onMatchClick", matchId);
  }

  private highlightTeam(teamId: string): void {
    this.highlightedTeamId = teamId;
  }

  private unhighlightTeam(): void {
    this.highlightedTeamId = undefined;
  }

  get recursiveBracket(): IBracketNode | undefined {
    let copyRound = this.rounds;
    if (this.format === "courthive") {
      copyRound = courthiveAdaptor(this.rounds);
    }
    return transformBracket(copyRound);
  }

  get cssVars(): { [key: string]: string } {
    return {
      "--text-color": this.textColor,
      "--title-color": this.titleColor,
      "--team-background-color": this.teamBackgroundColor,
      "--highlight-team-background-color": this.highlightTeamBackgroundColor,
      "--score-background-color": this.scoreBackgroundColor,
      "--winner-score-background-color": this.winnerScoreBackgroundColor,
    };
  }
}
</script>

<style>
.vt-wrapper {
  display: flex;
}

.vt-item-teams,
.vt-item-feedIn {
  color: var(--text-color);
}

.vt-item-teams .title,
.vt-item-feedIn .title {
  color: var(--title-color);
}

.vt-item-teams .vt-team,
.vt-item-feedIn .vt-feedIn {
  background-color: var(--team-background-color);
}

.vt-item-teams .vt-team .score {
  background-color: var(--score-background-color);
}

.vt-item-teams .vt-team.winner .score {
  background-color: var(--winner-score-background-color);
}

.vt-item-teams .vt-team.highlight,
.vt-item-feedIn .vt-feedIn.highlight {
  background-color: var(--highlight-team-background-color);
}
</style>