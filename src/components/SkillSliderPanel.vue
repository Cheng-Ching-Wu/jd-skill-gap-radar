<script setup lang="ts">
import { onMounted } from 'vue'
import { useSkillStore } from '@/store/skill'
const store = useSkillStore()
onMounted(()=>store.initDict())
function setVal(k:string,e:Event){ const v=Number((e.target as HTMLInputElement).value); store.setUserLevel(k,v) }
</script>
<template>
  <div class="card">
    <div class="head"><h3>我的技能熟練度</h3><small>拖曳滑桿設定 0–100</small></div>
    <div class="grid">
      <div v-for="s in store.dict" :key="s.key" class="row">
        <label :for="s.key">{{ s.label }}</label>
        <input type="range" :id="s.key" min="0" max="100" :value="store.userLevels[s.key] ?? 50" @input="(e)=>setVal(s.key,e)" />
        <span class="val">{{ store.userLevels[s.key] ?? 50 }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:12px}
.head{display:flex;align-items:baseline;gap:10px;margin-bottom:8px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.row{display:grid;grid-template-columns:140px 1fr 40px;align-items:center;gap:10px}
.val{text-align:right;font-variant-numeric:tabular-nums}
@media (max-width:900px){.grid{grid-template-columns:1fr}}
</style>
