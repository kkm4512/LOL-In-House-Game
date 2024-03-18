import { defineStore } from "pinia";
import type { LoLUserPlayers } from "~/types/LOl-User-Players";

export const useLOLPlayerUserInfo = defineStore("user", {
  state: () => ({
    users: {} as LoLUserPlayers,
  }),
  actions: {
    updateUsers(usersInfo: LoLUserPlayers) {
      this.users = usersInfo;
    },
  },
  persist: true,
});
