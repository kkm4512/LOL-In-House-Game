import { defineStore } from "pinia";
import type { LolUserPlayers } from "~/types/LOl-User-Players";

export const useLOLPlayerUserInfo = defineStore("user", {
  state: () => ({
    users: [{}],
  }),
  actions: {
    updateUsers(usersInfo: LolUserPlayers[]) {
      this.users = usersInfo;
    },
  },
  persist: true,
});
