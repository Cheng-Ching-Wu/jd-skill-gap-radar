<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useSkillStore } from '@/store/skill'
import { plain } from '@/utils/adapters'
const store = useSkillStore()
const el = ref<HTMLDivElement|null>(null)
let chart: echarts.ECharts | null = null
let ro: ResizeObserver | null = null
function ensure(){
  const n=el.value; if(!n) return
  const r=n.getBoundingClientRect(); if(r.width<=0||r.height<=0) return
  if(!chart) chart=echarts.init(n); else chart.resize()
}
function draw(){
  if(!chart) return
  const indicators=plain(store.radarIndicators)
  const series=plain(store.seriesData)
  chart.setOption({
    tooltip:{trigger:'item'},
    legend:{data:series.map(s=>s.name)},
    radar:{indicator:indicators},
    series:[{type:'radar',data:series}],
    aria:{enabled:true}
  },{notMerge:true})
}
onMounted(()=>{
  ro=new ResizeObserver(()=>ensure()); if(el.value) ro.observe(el.value)
  ensure(); draw()
})
onBeforeUnmount(()=>{ ro?.disconnect(); ro=null; if(chart){try{chart.dispose()}catch{} chart=null} })
watch(()=>[store.jdDims,store.jdWeights,store.userLevels], ()=>{ ensure(); draw() }, {deep:true})
</script>
<template>
  <div class="card">
    <h3 class="title">技能落差雷達</h3>
    <div ref="el" class="chart" aria-label="技能落差雷達"></div>
    <div v-if="!store.jdDims.length" class="hint">先貼上 JD 並解析，或直接調整滑桿</div>
  </div>
</template>
<style scoped>
.card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:12px}
.title{margin:0 0 8px}
.chart{width:100%;height:360px}
.hint{color:#6b7280;font-size:13px;margin-top:6px}
</style>
