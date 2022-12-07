export interface musicApi {
  getLists: (limit: number) => Promise<void>;
  searchSong: (string) => Promise<void>;
  getListDetails: (id: number) => Promise<void>;
  getAllSongs: (id: number) => Promise<void>;
  getSongUrl: (id: number) => Promise<void>;
  getSongDetails: (ids: string) => Promise<void>;
}
export interface IElectronApi {
  send: (string) => Promise<void>;
  searchSong: (string) => Promise<void>;
}
declare global {
  interface Window {
    musicApi: musicApi;
    electronApi: IElectronApi;
  }
}
