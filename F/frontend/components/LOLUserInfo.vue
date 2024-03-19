<template>
  <div class="flex flex-col h-screen gap-4 p-12 justify-center">
    <div v-for="index in 10" :key="index" class="flex items-center gap-4 justify-center">
      <input
        type="text"
        v-model="formData[index - 1].name"
        placeholder="이름 입력"
        class="input border border-gray-300 rounded p-2"
        required
      />
      <select v-model="formData[index - 1].tier" class="border border-gray-300 rounded p-2 cursor-pointer">
        <option disabled value="">티어 선택</option>
        <option v-for="tier in tiers" :key="tier" :value="tier">
          {{ tier }}
        </option>
      </select>
      <select v-model="formData[index - 1].mainRole" class="border border-gray-300 rounded p-2 cursor-pointer">
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
      <button class="border-2 rounded-lg p-2 cursor-pointer" @click="handleAllClick(index - 1)">ALL</button>
    </div>
    <button @click="submitForm" class="mt-4 p-2 bg-blue-600 text-white rounded w-auto self-center">확인</button>
    <button @click="piniaStoreUserInfo" class="mt-4 p-2 bg-blue-600 text-white rounded w-auto self-center">이전 플레이어 목록</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { ErrorType } from "~/types/errorType"
import { useRouter } from "vue-router";
const router = useRouter()
import { useLOLPlayerUserInfo } from "~/stores/LOL-Player-info";
import type { LolUserPlayers } from "~/types/LOl-User-Players";
const usersStore = useLOLPlayerUserInfo()

interface FormData {
  name: string;
  mainRole: string;
  tier: string;
  subRole: string[]; // 타입을 string[]로 변경
}


function piniaStoreUserInfo(){
  console.log(usersStore.users.seted_A_Team[0].subRole)
  for ( let i=0; i<5; i++ ) {
    formData[i].mainRole = usersStore.users.seted_A_Team[i].mainRole
    formData[i].name = usersStore.users.seted_A_Team[i].name
    formData[i].subRole = usersStore.users.seted_A_Team[i].subRole
    formData[i].tier = usersStore.users.seted_A_Team[i].tier
    
  }
  for ( let i=0; i<5; i++ ) {
    console.log(formData[i+5])
    formData[i+5].mainRole = usersStore.users.seted_B_Team[i].mainRole
    formData[i+5].name = usersStore.users.seted_B_Team[i].name
    formData[i+5].subRole = usersStore.users.seted_B_Team[i].subRole
    formData[i+5].tier = usersStore.users.seted_B_Team[i].tier
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

const roles = ["탑", "정글", "미드", "원딜", "서폿"];
const tiers = [
  "아이언 4", "아이언 3", "아이언 2", "아이언 1",
  "브론즈 4", "브론즈 3", "브론즈 2", "브론즈 1",
  "실버 4", "실버 3", "실버 2", "실버 1",
  "골드 4", "골드 3", "골드 2", "골드 1",
  "플래티넘 4", "플래티넘 3", "플래티넘 2", "플래티넘 1",
  "에메랄드 4", "에메랄드 3", "에메랄드 2", "에메랄드 1",
  "다이아몬드 4", "다이아몬드 3", "다이아몬드 2", "다이아몬드 1",
  "마스터", "그랜드마스터", "챌린저"
];

function handleAllClick(index:any) {
  // 선택한 주라인
  const selectedMainRole = formData[index].mainRole;
  
  // 주라인을 제외한 나머지 라인을 필터링
  const otherRoles = roles.filter(role => role !== selectedMainRole);
  
  // subRole에 주라인을 제외한 나머지 라인을 문자열로 저장
  // 예: 탑을 주라인으로 선택했을 경우, "정글,미드,원딜,서폿" 이런 식으로 저장
  formData[index].subRole = otherRoles; // 문자열 배열로 할당

}

async function submitForm() {
  
  try {
    const response: LolUserPlayers[] = await $fetch("http://localhost:3001", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })  as LolUserPlayers[]

  usersStore.updateUsers(response)
  router.push('LOLMatching')
  

  } catch (error){
    if (error instanceof Error && "response" in error) {
      const typedError = error.response as ErrorType;
      const errors = {
        error: typedError._data.error,
        statusCode: typedError._data.statusCode,
        message: typedError._data.message,
      };
      alert(errors.message)

      return errors
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

.input-field, .select-field {
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
</style>
