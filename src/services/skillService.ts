import api from '@/utils/apiClient'

export type SkillDictItem = { key: string; label: string; category: string }
export type AnalyzeResult = { dims: string[]; jdWeights: Record<string, number> }

export async function fetchSkillDict(): Promise<SkillDictItem[]> {
  const { data } = await api.get('/skills-dict')
  return data?.skills ?? []
}
export async function analyzeJD(text: string): Promise<AnalyzeResult> {
  const { data } = await api.post('/analyze-jd', { text })
  return data
}
