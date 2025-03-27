import { useToggleFavorite } from '@/hooks/use-songs';
import { useGetFavoriteSongs } from '@/hooks/use-songs'; // Import the hook for favorites
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Music } from 'lucide-react';
import { Song } from '@/types/song';

export function SongCard({ song }: { song: Song }) {
  const toggleFavorite = useToggleFavorite();
  const { data: favoriteSongs, isLoading: isFavoritesLoading } = useGetFavoriteSongs();

  const isFavorite = favoriteSongs?.some((favSong: Song) => favSong.id === song.id) || false;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white rounded-xl">
      <div className="relative aspect-square">
        <img
          src={song.coverImageUrl || 'https://placehold.co/400x400?text=No+Cover'}
          alt={song.title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full shadow-sm"
          onClick={() => toggleFavorite.mutate(song.id)}
          disabled={toggleFavorite.isPending || isFavoritesLoading} // Disable while loading favorites or toggling
        >
          <Heart
            className={`h-5 w-5 transition-all duration-200 ${
              isFavorite
                ? 'fill-red-500 text-red-500 scale-110'
                : 'text-gray-600'
            }`}
          />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-purple-500" />
          <h3 className="font-semibold text-lg text-gray-900 truncate">
            {song.title}
          </h3>
        </div>
        <p className="text-gray-600 text-sm mt-1 truncate">{song.artist}</p>
        {song.genre && (
          <p className="text-sm text-purple-500 mt-1 font-medium">
            {song.genre}
          </p>
        )}
      </div>
    </Card>
  );
}