import { defineStore } from "pinia";
import type {
  LolUserPlayers,
  PlayerInfos,
} from "~/types/LOl-User-Players";

interface UserInfo {
  mainRole: string;
  name: string;
  subRole: string[];
  tier: string;
}

export const useLOLPlayerUserInfo = defineStore("user", {
  state: () => ({
    seted_A_Team: [] as PlayerInfos[],
    seted_B_Team: [] as PlayerInfos[],
  }),

  actions: {
    updateUsers(usersInfo: LolUserPlayers) {
      this.seted_A_Team = usersInfo.seted_A_Team;
      this.seted_B_Team = usersInfo.seted_B_Team;
    },
  },
  persist: true,
});
