<template>
  <div class="role-selection-form">
    <div v-for="index in 10" :key="index" class="row">
      <input
        type="text"
        v-model="formData[index - 1].name"
        placeholder="이름 입력"
        class="input-field"
        required
      />
      <!-- 티어 선택하는 부분 -->
      <select v-model="formData[index - 1].tier" class="select-field">
        <option disabled value="">티어 선택</option>
        <option v-for="tier in tiers" :key="tier" :value="tier">
          {{ tier }}
        </option>
      </select>
      <!-- 라인(포지션) 선택하는 부분, 'All' 옵션 추가 -->
      <select v-model="formData[index - 1].mainRole" class="select-field">
        <option value="">주라인</option>
        <option v-for="role in roles" :key="role" :value="role">
          {{ role }}
        </option>
      </select>
      <input
        type="text"
        v-model="formData[index - 1].subRole"
        placeholder="부라인"
        class="input-field"
        required
      />
      <input type="button" class="all-line-click" @click="handleAllClick(index - 1)" value="ALL">
        
      </input>
    </div>
    <button @click="submitForm" class="submit-button">확인</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { ErrorType } from "~/types/errorType"

const formData = reactive(
  Array.from({ length: 10 }, () => ({
    name: "",
    mainRole: "",
    tier: "",
    subRole: "",
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
  formData[index].subRole = otherRoles.join(',');
}

async function submitForm() {
  try {
    const response = await $fetch("http://localhost:3001", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });    
  console.log(response)

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
