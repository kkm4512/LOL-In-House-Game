import { defineStore } from "pinia";
import type { LoLUserPlayers, newLoLUserPlayers } from "~/types/LOl-User-Players";

interface UserInfo {
  mainRole : string;
  name : string;
  subRole : string[];
  tier : string
}

export const useLOLPlayerUserInfo = defineStore("user", {
  state: () => ({
    users: {} as newLoLUserPlayers[],
  }),

  
  actions: {
    updateUsers(usersInfo: newLoLUserPlayers[]) {
      this.users = usersInfo;
    },
  },
  persist: true,
});
