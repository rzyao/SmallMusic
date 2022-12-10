import pinia from '@/stores/store';
import { useVolumeStore } from '@/stores/volume';
import { db } from '@/untils/dexie/db';
const store = useVolumeStore(pinia);
export async function getVolume() {
  let num = 50;
  try {
    const res = await db.options.where('id').equalsIgnoreCase('volume').toArray();
    console.log('上次音量:  ' + res[0].value);
    const result = res[0].value;
    store.volume = Number(result);
    num = Number(result) * 80;
  } catch {
    console.log('获取上次音量失败');
    const result = 0.5;
    store.volume = Number(result);
    num = count2(Number(result));
    num = Number(num) * 80;
  }
  return num;
}
function count2(y: number) {
  const z = Math.sqrt(y);
  return z;
}
