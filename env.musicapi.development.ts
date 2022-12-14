import axios from 'axios';
const MusicApi = {
  getLists: async (limit: number) => {
    const url = `http://localhost:3000/personalized?limit=${limit}`;
    const result: any = {};
    const res = await axios({ url, withCredentials: true });
    result.body = res.data;
    return result;
  },
  searchSong: async (keywords: string) => {
    const url = `http://localhost:3000/search?keywords= ${keywords}`;
    const result: any = {};
    const res = await axios({ url, withCredentials: true });
    result.body = res.data;
    return result;
  },
  getListDetails: async (id: number) => {
    const url = `http://localhost:3000/playlist/detail?id=${id}`;
    const result: any = {};
    const res = await axios({ url, withCredentials: true });
    result.body = res.data;
    return result;
  },
  getAllSongs: async (id: number) => {
    const url = `http://localhost:3000/playlist/track/all?id=${id}`;
    const result: any = {};
    const res = await axios({ url, withCredentials: true });
    result.body = res.data;
    return result;
  },
  getSongUrl: async (id: number) => {
    const url = `http://localhost:3000/song/url?id=${id}`;
    const result: any = {};
    const res = await axios({ url, withCredentials: true });
    result.body = res.data;
    return result;
  },
  getSongDetails: async (ids: string) => {
    const url = `http://localhost:3000/song/detail?ids=${ids}`;
    const result: any = {};
    const res = await axios({ url, withCredentials: true });
    result.body = res.data;
    return result;
  },
};
export default MusicApi;
