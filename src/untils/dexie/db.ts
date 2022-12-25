// db.ts
import Dexie from 'dexie';
import type { Table } from 'dexie';
export interface CollectList {
  id: string;
}
export interface CreatedList {
  id: string;
  name: string;
  songCount: string;
  createTime: string;
}
export interface FavoriteSong {
  id: string;
  name: string;
  singers: string;
  album: string;
  resource: string;
  coverImgUrl: string;
}
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
export interface CSong {
  id?: number;
  name: string;
  singers: string;
  album: string;
  listId: string;
}
export class MySubClassedDexie extends Dexie {
  // 'options' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  options!: Table<Option>;
  songs!: Table<Song>;
  favorite!: Table<FavoriteSong>;
  createdList!: Table<CreatedList>;
  collectList!: Table<CollectList>;
  collectSongs!: Table<Song>;
  constructor() {
    super('songDatabase001');
    this.version(1).stores({
      options: 'id, value', // Primary key and indexed props
      songs: 'id,name,singers,album',
    });
    // 我喜欢的音乐
    this.version(2).stores({
      favorite: 'id,name,singers,album,resource,coverImgUrl',
    });
    // 我收藏的歌单
    this.version(5).stores({
      collectList: 'id',
    });
    // 我创建的歌单
    this.version(8).stores({
      createdList: 'id,name,songCount,createTime',
    });
    // 我收藏的音乐 只能收藏到我创建的歌单
    this.version(7).stores({
      collectSongs: '++id,name,singers,album,listId',
    });
  }
}

export const db = new MySubClassedDexie();
