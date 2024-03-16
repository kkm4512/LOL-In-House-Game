<template>
  <div class="content-container">
    <div class="teams-container">
      <div class="team">
        <h2 class="team-title mr-7">A팀</h2>
        <ul>
          <li
            v-for="player in usersStore.users.seted_A_Team"
            :key="player.name"
            class="player mt-20"
          >
            <img :src="`../static/${player.tier.split(' ')[0]}.jpg`" />

            <!-- <img :src="`../public/${player.tier.split(' ')[0]}.jpg`" /> -->
            {{ player.mainRole }} {{ player.name }}
          </li>
        </ul>
      </div>

      <div class="vs-container">
        <img src="../public/Vs.jpg" alt="VS" class="vs-image" />
        <div class="vs-text">[심롤]</div>
      </div>

      <div class="team">
        <h2 class="team-title mr-7">B팀</h2>
        <ul>
          <li
            v-for="player in usersStore.users.seted_B_Team"
            :key="player.name"
            class="player mt-20"
          >
            <img :src="`../static/${player.tier.split(' ')[0]}.jpg`" />
            {{ player.mainRole }} {{ player.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLOLPlayerUserInfo } from "~/stores/LOL-Player-info";
const usersStore = useLOLPlayerUserInfo();
</script>

<style scoped>
.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 전체 뷰포트 높이를 사용 */
}

.teams-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.team {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.team-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
}

.player {
  list-style-type: none;
  font-size: 1.5rem;
}
</style>
