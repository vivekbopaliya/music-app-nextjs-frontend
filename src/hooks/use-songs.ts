import { CreateSongDTO, Song } from '@/types/song';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const useGetSongs = () => {
  return useQuery({
    queryKey: ['songs'],
    queryFn: async (): Promise<Song[]> => {
      const { data } = await axios.get(`${API_URL}/songs`, { withCredentials: true });
      return data;
    },
  });
};

export const useSearchSongs = (query: string) => {
  return useQuery({
    queryKey: ['songs', 'search', query],
    queryFn: async (): Promise<Song[]> => {
      const { data } = await axios.get(`${API_URL}/songs/search?q=${query}`, { withCredentials: true });
      return data;
    },
    enabled: !!query,
  });
};

export const useGetFavoriteSongs = () => {
  return useQuery({
    queryKey: ['songs', 'favorites'],
    queryFn: async (): Promise<Song[]> => {
      const { data } = await axios.get(`${API_URL}/songs/favorites`, { withCredentials: true, });
      return data;
    },
  });
};

export const useCreateSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (song: CreateSongDTO): Promise<Song> => {
      const { data } = await axios.post(`${API_URL}/songs`, song, { withCredentials: true });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
    },
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (songId: string) => {
      const { data } = await axios.post(`${API_URL}/songs/${songId}/favorite`, {}, { withCredentials: true });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['songs'] });
      queryClient.invalidateQueries({ queryKey: ['songs', 'favorites'] });
    },
  });
};