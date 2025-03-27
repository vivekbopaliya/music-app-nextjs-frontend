export interface Song {
  id: string;
  title: string;
  artist: string;
  genre?: string;
  coverImageUrl?: string;
}

export interface CreateSongDTO {
  title: string;
  artist: string;
  genre?: string;
  coverImageUrl?: string;
}
