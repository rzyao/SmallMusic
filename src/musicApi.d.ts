export interface musicApi {
  //获取推荐歌单,limit:获取数量
  getLists: (limit: number) => Promise<void>;
  searchSong: (string) => Promise<void>;
  getListDetails: (id: number) => Promise<void>;
  getAllSongs: (id: number) => Promise<void>;
  getSongUrl: (id: number) => Promise<void>;
  getSongDetails: (ids: string) => Promise<void>;
  getSongWord: (id: number) => Promise<void>;
}
export interface IElectronApi {
  send: (string) => Promise<void>;
  searchSong: (string) => Promise<void>;
}
declare global {
  interface Window {
    musicApi: musicApi;
    electronApi: IElectronApi;
    devApi: musicApi;
  }
}
declare global {
  interface String {
    byteLength(this: string): number;
  }
}
