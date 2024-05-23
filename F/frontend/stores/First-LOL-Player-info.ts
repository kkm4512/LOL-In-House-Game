import { defineStore } from "pinia"
import type { FirstLoLUserPlayers, FirstPlayerInofs } from "~/types/LOl-User-Players"

export const useFirstUsers = defineStore('firstUsers',  {
    state: () => ({
      A_Team : [] as FirstPlayerInofs[],
      B_Team : [] as FirstPlayerInofs[],
    }),

    actions: {
        updateFirstUsersUpdate(firstUsers:FirstLoLUserPlayers) {
            this.A_Team = firstUsers.A_Team;
            this.B_Team = firstUsers.B_Team;
        },
    },
})