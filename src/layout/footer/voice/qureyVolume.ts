import pinia from '@/stores/store';
import { useVolumeStore } from '@/stores/volume';
import { db } from '@/untils/dexie/db';
const store = useVolumeStore(pinia);
export async function getVolume() {
  const res = await db.options.where('id').equalsIgnoreCase('volume').toArray();
  const result = res[0].value;
  store.volume = Number(result);
  const num = Number(result) * 80;
  return num;
}
