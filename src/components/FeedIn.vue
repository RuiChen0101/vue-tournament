<template>
  <div class="vt-item-feedIn">
    <div>
      <div class="title">
        <span>{{ bracketNode.match.title }}</span>
      </div>
      <div
        :class="['vt-feedIn', getPlayerClass(bracketNode.match.feedIn)]"
        @mouseover="highlightTeam(bracketNode.match.feedIn.id)"
        @mouseleave="unhighlightTeam"
        @click="onClick"
      >
        <span class="name">{{ bracketNode.match.feedIn.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import IBracketNode from "../interface/IBracketNode";
import { Component, Prop, Vue } from "vue-property-decorator";
import IFeedIn from "@/interface/IFeedIn";

@Component
export default class GameMatch extends Vue {
  @Prop({ type: Object, default: {} }) bracketNode!: IBracketNode;
  @Prop({ type: String, default: undefined }) highlightedTeamId!: string;

  private getPlayerClass(feedIn: IFeedIn): string {
    let clazz = "";

    if (this.highlightedTeamId === feedIn.id) {
      clazz += " highlight";
    }

    return clazz;
  }

  private onClick(): void {
    this.$emit("onMatchClick", this.bracketNode?.match?.id);
  }

  private highlightTeam(playerId: string): void {
    this.$emit("onSelectedTeam", playerId);
  }

  private unhighlightTeam(): void {
    this.$emit("onDeselectedTeam");
  }
}
</script>
