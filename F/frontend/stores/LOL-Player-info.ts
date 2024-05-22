import { defineStore } from "pinia";
import type { LoLUserPlayers, PlayerInfos, newLoLUserPlayers } from "~/types/LOl-User-Players";

interface UserInfo {
  mainRole : string;
  name : string;
  subRole : string[];
  tier : string
}

export const useLOLPlayerUserInfo = defineStore("user", {
  state: () => ({
    A_Team: [] as PlayerInfos[],
    B_Team: [] as PlayerInfos[]
  }),

  
  actions: {
    updateUsers(usersInfo: newLoLUserPlayers) {
      this.A_Team = usersInfo.A_Team,
      this.B_Team = usersInfo.B_Team
    },
  },
  persist: true,
});
