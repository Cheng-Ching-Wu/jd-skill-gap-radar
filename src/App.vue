<script setup lang="ts">
import Dashboard from '@/pages/Dashboard.vue'
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>職缺 JD × 技能落差雷達（面試 Demo）</h1>
      <p>Vue 3 + TypeScript + Pinia + ECharts + MSW</p>
    </header>
    <Dashboard />
    <footer class="footer">
      <small>Demo · 可直接改接真實 API · 支援匯出計畫</small>
    </footer>
  </div>
</template>

<style scoped>
.app{max-width:1200px;margin:0 auto;padding:20px}
.header h1{margin:0 0 6px;font-size:20px}
.header p{margin:0;color:#666;font-size:13px}
.footer{margin-top:20px;color:#8a8a8a;text-align:center}
</style>
