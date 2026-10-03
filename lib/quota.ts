import { DAILY_LIMIT } from './config';
// Swap this adapter for an authenticated server-side implementation when needed.
export interface QuotaStore { remaining():number; consume():boolean }
const KEY='a-chto-esli:quota:v1';
export class LocalQuota implements QuotaStore {
 private day(){ return new Date().toLocaleDateString('en-CA'); }
 private read(){const raw=localStorage.getItem(KEY); if(!raw)return {day:this.day(),count:0}; try {const v=JSON.parse(raw); return v.day===this.day()&&Number.isInteger(v.count)&&v.count>=0? v:{day:this.day(),count:0};}catch{return {day:this.day(),count:0};}}
 remaining(){return Math.max(0,DAILY_LIMIT-this.read().count);}
 consume(){const v=this.read();if(v.count>=DAILY_LIMIT)return false; localStorage.setItem(KEY,JSON.stringify({day:this.day(),count:v.count+1}));return true;}
}
