<template>
  <div class="content-container h-screen flex gap-4 mt-[10%]">
    <div class="teams-container">
      <div class="team border-2 rounded-xl border-red-500 p-5">
        <h2 class="team-title flex justify-center items-center">A팀</h2>
        <div class="flex justify-center items-center">
          <div class="text-2xl">
            <!-- 생각해보니 여기가 문제네 -->
            <!-- 피니아에 저장하는 값을 바꿨으니까 여기서도 다르게 접근해야함 내일하자 ㅇㅇ; -->

            A팀 Score :
            {{ usersStore.seted_A_Team.reduce((a, b) => a + b.mmr, 0) }}
          </div>
        </div>
        <ul>
          <li
            v-for="player in usersStore.seted_A_Team"
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
        <div class="flex justify-center mt-10">
          <img src="/static/lulu.png" class="lulu border-2 boder-black"  />
        </div>
        <img src="/static/Vs.jpg" alt="VS" class="vs-image" />
      </div>

      <div class="team border-2 rounded-xl border-blue-500 p-5">
        <h2 class="team-title flex justify-center items-center">B팀</h2>
        <div class="flex justify-center items-center">
          <div class="text-2xl">
            B팀 Score :
            {{ usersStore.seted_B_Team.reduce((a, b) => a + b.mmr, 0) }}
          </div>
        </div>
        <ul>
          <li
            v-for="player in usersStore.seted_B_Team"
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
.lulu {
  width: 300px;
  height: 300px;
}
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
