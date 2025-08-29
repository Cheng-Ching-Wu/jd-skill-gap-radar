import { toRaw } from 'vue'
export const plain=<T,>(v:T):T=>JSON.parse(JSON.stringify(toRaw(v)))
export const formatNumber=(n:number)=>Number(n).toLocaleString('en-US')
