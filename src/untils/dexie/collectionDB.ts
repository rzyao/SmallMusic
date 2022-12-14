import Dexie from 'dexie';
export const collectionDB = new Dexie('CleectionList').open();
