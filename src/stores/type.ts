interface singer {
  id: number;
  name: string;
}
export interface Song {
  id: string;
  name: string;
  singers: singer[];
  album: string;
}
export interface SongDetails {
  id: string;
  name: string;
  singers: singer[];
  album: string;
  picUrl: string;
}
