import { defineStore } from 'pinia'
import { fetchSkillDict, analyzeJD, type SkillDictItem } from '@/services/skillService'

type RadarSeries = { name: string; value: number[] }

export const useSkillStore = defineStore('skill', {
  state: () => ({
    dict: [] as SkillDictItem[],
    userLevels: {} as Record<string, number>,
    jdDims: [] as string[],
    jdWeights: {} as Record<string, number>,
    loading: false,
    error: null as string | null
  }),
  getters: {
    radarIndicators: (s) => s.jdDims.map(d => ({ name: d, max: 100 })),
    seriesData: (s) => {
      if (!s.jdDims.length) return [] as RadarSeries[]
      const req = s.jdDims.map(d => s.jdWeights[d] ?? 0)
      const mine = s.jdDims.map(d => s.userLevels[d] ?? 0)
      return [
        { name: 'JD 要求', value: req },
        { name: '我的現況', value: mine }
      ]
    },
    learningPlan: (s) => s.jdDims
      .map(d => ({ dim: d, need: Math.max(0, (s.jdWeights[d] ?? 0) - (s.userLevels[d] ?? 0)) }))
      .sort((a,b)=>b.need-a.need)
  },
  actions: {
    async initDict() {
      if (this.dict.length) return
      this.dict = await fetchSkillDict()
      this.dict.forEach(i => { if (!(i.key in this.userLevels)) this.userLevels[i.key] = 50 })
    },
    async analyze(text: string) {
      this.loading = true; this.error = null
      try {
        const { dims, jdWeights } = await analyzeJD(text)
        this.jdDims = dims
        this.jdWeights = jdWeights
      } catch (e:any) {
        this.error = e?.message ?? '解析 JD 失敗'
      } finally {
        this.loading = false
      }
    },
    setUserLevel(key: string, v: number) {
      this.userLevels[key] = v
    }
  }
})
