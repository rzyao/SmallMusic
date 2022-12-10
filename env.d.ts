/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_MUSIC_API: MusicApi;
}
interface MusicApi {
  readonly getLists: (limit: number) => Promise<void>;
}
