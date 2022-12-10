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
