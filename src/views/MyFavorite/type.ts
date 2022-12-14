export interface ListDetails {
  id: number;
  name: string;
  picUrl: string;
}
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
