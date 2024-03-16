<template>
  <div class="content-container">
    <div class="teams-container">
      <div class="team">
        <h2 class="team-title mr-7">A팀</h2>
        <ul>
          <li v-for="player in usersStore.users.seted_A_Team" :key="player.name" class="player mt-20">
            {{ player.mainRole }} {{ player.name }}
          </li>
        </ul>
      </div>

      <img src="../static/Vs.jpg" />

      <div class="team">
        <h2 class="team-title mr-7">B팀</h2>
        <ul>
          <li v-for="player in usersStore.users.seted_B_Team" :key="player.name" class="player mt-20">
            {{ player.mainRole }} {{ player.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLOLPlayerUserInfo } from '~/stores/LOL-Player-info';
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
  font-size: 1.5rem
}

</style>
