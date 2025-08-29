import { http, HttpResponse } from 'msw'

const skills = [
  { key: 'JS', label: 'JavaScript', category: 'frontend' },
  { key: 'TS', label: 'TypeScript', category: 'frontend' },
  { key: 'Vue', label: 'Vue 生態系', category: 'frontend' },
  { key: 'CSS', label: 'CSS', category: 'frontend' },
  { key: 'Test', label: '單元測試', category: 'quality' },
  { key: 'API', label: 'API 串接', category: 'backend' },
  { key: 'Arch', label: '基礎架構設計', category: 'architecture' }
]

export const handlers = [
  http.get('/api/skills-dict', () => HttpResponse.json({ skills })),

  http.post('/api/analyze-jd', async ({ request }) => {
    const body = await request.json() as { text: string }
    const text = (body?.text || '').toLowerCase()
    const dims = skills.map(s => s.key)

    function weightFor(k: string) {
      const map: Record<string, string[]> = {
        JS: ['javascript','js'],
        TS: ['typescript','ts'],
        Vue: ['vue','vite','pinia'],
        CSS: ['css','scss','tailwind'],
        Test: ['test','testing','jest','vitest','單元'],
        API: ['api','axios','rest','graphql'],
        Arch: ['arch','架構','design','設計']
      }
      const kws = map[k] || []
      let score = 0
      for (const kw of kws) {
        const count = (text.match(new RegExp(kw, 'g')) || []).length
        score += count * 25
      }
      return Math.max(0, Math.min(100, score))
    }

    const jdWeights: Record<string, number> = {}
    for (const d of dims) jdWeights[d] = weightFor(d)
    const allZero = Object.values(jdWeights).every(v => v === 0)
    if (allZero) Object.assign(jdWeights, { JS:80, TS:70, Vue:75, CSS:60, Test:40, API:60, Arch:50 })

    return HttpResponse.json({ dims, jdWeights })
  })
]
