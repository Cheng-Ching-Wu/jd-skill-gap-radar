<script setup lang="ts">
import { ref } from 'vue'
import { useSkillStore } from '@/store/skill'
const store = useSkillStore()
const text = ref('我們正在徵求前端工程師，熟悉 JavaScript / TypeScript、Vue 生態系，具備 CSS、單元測試與 API 串接能力，了解前後端整合與簡單架構設計。')
async function analyze(){ await store.analyze(text.value) }
</script>
<template>
  <div class="card">
    <label class="label">貼上職缺 JD</label>
    <textarea v-model="text" rows="5" class="ta" placeholder="貼上職缺內容，或輸入關鍵字…"></textarea>
    <div class="actions"><button class="btn" @click="analyze">解析 JD</button></div>
  </div>
</template>
<style scoped>
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:12px}
.label{display:block;font-weight:600;margin-bottom:6px}
.ta{width:100%;resize:vertical;border:1px solid #e5e7eb;border-radius:8px;padding:8px;font-family:inherit}
.actions{margin-top:8px;display:flex;gap:8px}
.btn{background:#111827;color:#fff;border:none;border-radius:8px;padding:8px 12px;cursor:pointer}
.btn:hover{background:#0b1220}
</style>
