<script setup lang="ts">
import { computed } from 'vue'
import { useSkillStore } from '@/store/skill'
const store = useSkillStore()
const topList = computed(()=>store.learningPlan.slice(0,8))
</script>
<template>
  <div class="card">
    <h3 class="title">建議學習清單（依缺口排序）</h3>
    <ol class="list">
      <li v-for="item in topList" :key="item.dim">
        <span class="dim">{{ item.dim }}</span>
        <span class="gap">缺口 {{ item.need }}</span>
      </li>
    </ol>
  </div>
</template>
<style scoped>
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:12px}
.title{margin:0 0 8px}
.list{margin:0;padding-left:20px}
.dim{font-weight:600;margin-right:8px}
.gap{color:#6b7280}
</style>
