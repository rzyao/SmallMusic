// db.ts
import Dexie from 'dexie';
import type { Table } from 'dexie';

export interface Option {
  id: string;
  value: string;
}
export interface Song {
  id: string;
  name: string;
  singers: string;
  album: string;
}
export class MySubClassedDexie extends Dexie {
  // 'options' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  options!: Table<Option>;
  songs!: Table<Song>;
  constructor() {
    super('songDatabase001');
    this.version(1).stores({
      options: 'id, value', // Primary key and indexed props
      songs: 'id,name,singers,album',
    });
  }
}

export const db = new MySubClassedDexie();
