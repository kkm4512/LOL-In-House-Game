<template>
  <div class="flex flex-col h-screen gap-4 p-12 justify-center body mt-[8%]">
    <div
      v-for="index in 10"
      :key="index"
      class="flex items-center gap-4 justify-center"
    >
      <input
        type="text"
        v-model="formData[index - 1].name"
        placeholder="이름 입력"
        class="input border border-gray-300 rounded p-2"
        required
      />
      <select
        v-model="formData[index - 1].tier"
        class="border border-gray-300 rounded p-2 cursor-pointer"
      >
        <option disabled value="">티어 선택</option>
        <option v-for="tier in tiers" :key="tier" :value="tier">
          {{ tier }}
        </option>
      </select>
      <select
        v-model="formData[index - 1].mainRole"
        class="border border-gray-300 rounded p-2 cursor-pointer"
      >
        <option value="">주라인</option>
        <option v-for="role in roles" :key="role" :value="role">
          {{ role }}
        </option>
      </select>
      <input
        type="text"
        v-model="formData[index - 1].subRole"
        placeholder="부라인"
        class="input border border-gray-300 rounded p-2"
        required
      />
      <button
        class="border-2 rounded-lg p-2 cursor-pointer"
        @click="handleAllClick(index - 1)"
      >
        ALL
      </button>
    </div>
    <div class="flex justify-center items-center h-screen">
      <div class="mr-2 text-lg">팀간의 밸런스 차이 :</div>
      <select
        class="border-2 border-black rounded-lg w-1/5 h-12 text-center"
        v-model="balanceSelected"
      >
        <option class="text-center text-lg">매우 잘맞음</option>
        <option class="text-center text-lg">적당히 잘맞음</option>
        <option class="text-center text-lg">걍 내맘대로 짬 ㅅㄱ</option>
      </select>
    </div>

    <button
      @click="submitForm"
      class="mt-4 p-2 bg-blue-600 text-white rounded w-auto self-center"
    >
      확인
    </button>
    <button
      @click="piniaStoreUserInfo"
      class="mt-4 p-2 bg-blue-600 text-white rounded w-auto self-center"
    >
      이전 플레이어 목록
    </button>
    <button @click="test" class="border-2 border-black h-full w-full">
      Test
    </button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { ErrorType } from "~/types/errorType";
import { useRouter } from "vue-router";
const router = useRouter();
import { useLOLPlayerUserInfo } from "~/stores/LOL-Player-info";
import type { LolUserPlayers } from "~/types/LOl-User-Players";
import { useFirstUsers } from "~/stores/First-LOL-Player-info";
const useFirstUsersStore = useFirstUsers();
const usersStore = useLOLPlayerUserInfo();
const balanceSelected = ref("매우 잘맞음");

interface FormData {
  name: string;
  mainRole: string;
  tier: string;
  subRole: string[]; // 타입을 string[]로 변경
}

function test() {
  const Team = {
    A_Team: [
      {
        name: "player10",
        mainRole: "탑",
        tier: "브론즈 4",
        subRole: ["정글", "미드", "원딜", "서폿"],
      },
      {
        name: "player1",
        mainRole: "정글",
        tier: "실버 4",
        subRole: ["탑", "미드", "원딜", "서폿"],
      },
      {
        name: "player2",
        mainRole: "미드",
        tier: "골드 4",
        subRole: ["탑", "정글", "원딜", "서폿"],
      },
      {
        name: "player3",
        mainRole: "서폿",
        tier: "플래티넘 4",
        subRole: ["탑", "정글", "미드", "원딜"],
      },
      {
        name: "player4",
        mainRole: "원딜",
        tier: "다이아몬드 4",
        subRole: ["탑", "정글", "미드", "서폿"],
      },
    ],
    B_Team: [
      {
        name: "player5",
        mainRole: "탑",
        tier: "브론즈 4",
        subRole: ["정글", "미드", "원딜", "서폿"],
      },
      {
        name: "player6",
        mainRole: "정글",
        tier: "실버 4",
        subRole: ["탑", "미드", "원딜", "서폿"],
      },
      {
        name: "player7",
        mainRole: "서폿",
        tier: "골드 4",
        subRole: ["탑", "정글", "미드", "원딜"],
      },
      {
        name: "player8",
        mainRole: "미드",
        tier: "플래티넘 4",
        subRole: ["탑", "정글", "원딜", "서폿"],
      },
      {
        name: "player9",
        mainRole: "탑",
        tier: "다이아몬드 4",
        subRole: ["정글", "미드", "원딜", "서폿"],
      },
    ],
  };

  useFirstUsersStore.updateFirstUsersUpdate(Team);

  for (let i = 0; i < 5; i++) {
    formData[i].mainRole = useFirstUsersStore.A_Team[i].mainRole;
    formData[i].name = useFirstUsersStore.A_Team[i].name;
    formData[i].subRole = useFirstUsersStore.A_Team[i].subRole;
    formData[i].tier = useFirstUsersStore.A_Team[i].tier;
    formData[i + 5].mainRole = useFirstUsersStore.B_Team[i].mainRole;
    formData[i + 5].name = useFirstUsersStore.B_Team[i].name;
    formData[i + 5].subRole = useFirstUsersStore.B_Team[i].subRole;
    formData[i + 5].tier = useFirstUsersStore.B_Team[i].tier;
  }
}

function piniaStoreUserInfo() {
  for (let i = 0; i < 5; i++) {
    formData[i].mainRole = useFirstUsersStore.A_Team[i].mainRole;
    formData[i].name = useFirstUsersStore.A_Team[i].name;
    formData[i].subRole = useFirstUsersStore.A_Team[i].subRole;
    formData[i].tier = useFirstUsersStore.A_Team[i].tier;
    formData[i + 5].mainRole = useFirstUsersStore.B_Team[i].mainRole;
    formData[i + 5].name = useFirstUsersStore.B_Team[i].name;
    formData[i + 5].subRole = useFirstUsersStore.B_Team[i].subRole;
    formData[i + 5].tier = useFirstUsersStore.B_Team[i].tier;
  }
}

const formData = reactive<FormData[]>(
  Array.from({ length: 10 }, () => ({
    name: "",
    mainRole: "",
    tier: "",
    subRole: [],
  }))
);

const A_Team = formData.slice(0, 5);
const B_Team = formData.slice(5, 10);

const Team = {
  A_Team: A_Team,
  B_Team: B_Team,
};

const roles = ["탑", "정글", "미드", "원딜", "서폿"];
const tiers = [
  "아이언 4",
  "아이언 3",
  "아이언 2",
  "아이언 1",
  "브론즈 4",
  "브론즈 3",
  "브론즈 2",
  "브론즈 1",
  "실버 4",
  "실버 3",
  "실버 2",
  "실버 1",
  "골드 4",
  "골드 3",
  "골드 2",
  "골드 1",
  "플래티넘 4",
  "플래티넘 3",
  "플래티넘 2",
  "플래티넘 1",
  "에메랄드 4",
  "에메랄드 3",
  "에메랄드 2",
  "에메랄드 1",
  "다이아몬드 4",
  "다이아몬드 3",
  "다이아몬드 2",
  "다이아몬드 1",
  "마스터",
  "그랜드마스터",
  "챌린저",
];

function handleAllClick(index: any) {
  // 선택한 주라인
  const selectedMainRole = formData[index].mainRole;

  // 주라인을 제외한 나머지 라인을 필터링
  const otherRoles = roles.filter((role) => role !== selectedMainRole);

  // subRole에 주라인을 제외한 나머지 라인을 문자열로 저장
  // 예: 탑을 주라인으로 선택했을 경우, "정글,미드,원딜,서폿" 이런 식으로 저장
  formData[index].subRole = otherRoles; // 문자열 배열로 할당
}

async function submitForm() {
  try {
    const response: LolUserPlayers = (await $fetch("http://localhost:3001", {
      method: "POST",
      body: {
        formData: formData,
        balanceSelected: balanceSelected.value,
      },
    })) as LolUserPlayers;

    usersStore.updateUsers(response);
    useFirstUsersStore.updateFirstUsersUpdate(Team);
    router.push("LOLMatching");
  } catch (error) {
    if (error instanceof Error && "response" in error) {
      const typedError = error.response as ErrorType;
      const errors = {
        error: typedError._data.error,
        statusCode: typedError._data.statusCode,
        message: typedError._data.message,
      };
      alert(errors.message);

      return errors;
    }
  }
}
</script>

<style>
.role-selection-form {
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 1rem;
  margin-top: 12rem;
}

.row {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  justify-items: center;
}

.input-field,
.select-field {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  justify-content: center;
  justify-items: center;
}

.select-field {
  cursor: pointer;
  justify-content: center;
  justify-items: center;
}

.submit-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  width: auto;
}

body {
  transform: scale(0.67);
  transform-origin: top center; /* 확대/축소 기준점을 상단 중앙으로 설정 */
}
</style>
