<template>
  <div class="content-container h-screen flex gap-4 mt-[10%]">
    <div class="teams-container">
      <div class="team border-2 rounded-xl border-red-500 p-5">
        <h2 class="team-title flex justify-center items-center">A팀</h2>
        <div class="flex justify-center items-center">
          <div class="text-2xl">
            A팀 Score :
            {{ usersStore.users.seted_A_Team.reduce((a, b) => a + b.mmr, 0) }}
          </div>
        </div>
        <ul>
          <li
            v-for="player in usersStore.users.seted_A_Team"
            :key="player.name"
            class="player mt-20"
          >
            <div class="flex justify-center items-center font-black">
              <img
                :src="`../static/${player.tier.split(' ')[0]}.png`"
                class="h-[6rem]"
              />
              {{ player.mainRole }} {{ player.name }}
            </div>
          </li>
        </ul>
      </div>

      <div class="vs-container">
        <div class="text-3xl flex justify-center mt-[10%]">
          심심한데 롤이나할까?
        </div>
        <hr class="border-2 border-black mt-2" />
        <div class="flex justify-center mt-10">
          <img src="/static/포로.jpg" class="border-2 boder-black" />
        </div>
        <img src="/static/Vs.jpg" alt="VS" class="vs-image" />
      </div>

      <div class="team border-2 rounded-xl border-blue-500 p-5">
        <h2 class="team-title flex justify-center items-center">B팀</h2>
        <div class="flex justify-center items-center">
          <div class="text-2xl">
            B팀 Score :
            {{ usersStore.users.seted_B_Team.reduce((a, b) => a + b.mmr, 0) }}
          </div>
        </div>
        <ul>
          <li
            v-for="player in usersStore.users.seted_B_Team"
            :key="player.name"
            class="player mt-20"
          >
            <div class="flex justify-center items-center font-black">
              <img
                :src="`../static/${player.tier.split(' ')[0]}.png`"
                class="h-[6rem]"
              />
              {{ player.mainRole }} {{ player.name }}
            </div>
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

body {
    transform: scale(0.67);
    transform-origin: top center; /* 확대/축소 기준점을 상단 중앙으로 설정 */
  }
</style>
