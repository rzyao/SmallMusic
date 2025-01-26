export interface Music163Api {
  //获取推荐歌单,limit:获取数量
  getLists: (limit: number) => Promise<void>;
  searchSong: (string) => Promise<void>;
  getListDetails: (id: number) => Promise<void>;
  getAllSongs: (id: number) => Promise<void>;
  getSongUrl: (id: number) => Promise<void>;
  getSongDetails: (ids: string) => Promise<void>;
  getSongWord: (id: number) => Promise<void>;
  search: (param: any) => Promise<void>;
}
export interface ElectronApi {
  hide: () => Promise<void>;
  show: () => Promise<void>;
  openModel: (param: string) => Promise<{ token: string; user: string }>;
  closeModel: () => Promise<void>;
}
declare global {
  interface Window {
    api: {
      music163: Music163Api;
      electron: ElectronApi;
    };
  }
}
declare global {
  interface String {
    byteLength(this: string): number;
  }
}
