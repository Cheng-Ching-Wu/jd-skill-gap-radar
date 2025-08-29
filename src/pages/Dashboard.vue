<script setup lang="ts">
import JDInput from '@/components/JDInput.vue'
import SkillSliderPanel from '@/components/SkillSliderPanel.vue'
import RadarGapChart from '@/components/RadarGapChart.vue'
import LearningPlanList from '@/components/LearningPlanList.vue'
</script>
<template>
  <div class="grid">
    <div class="left">
      <JDInput />
      <RadarGapChart style="margin-top:16px" />
    </div>
    <div class="right">
      <SkillSliderPanel />
      <LearningPlanList style="margin-top:16px" />
    </div>
  </div>
</template>
<style scoped>
.grid{display:grid;grid-template-columns:1.1fr 1fr;gap:16px}
.left,.right{min-width:0}
@media (max-width:900px){.grid{grid-template-columns:1fr}}
</style>
