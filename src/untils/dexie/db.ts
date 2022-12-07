// db.ts
import Dexie from 'dexie';
import type { Table } from 'dexie';

export interface Option {
  id: string;
  value: string;
}

export class MySubClassedDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  options!: Table<Option>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      options: 'id, value', // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
