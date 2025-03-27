"use client";

import { useState } from "react";
import { useGetSongs, useSearchSongs } from "@/hooks/use-songs";
import { SongCard } from "@/components/songs/song-card";
import { AddSongDialog } from "@/components/songs/add-song-dialog";
import { Input } from "@/components/ui/input";
import { Search, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: songs, isLoading } = useGetSongs();
  const { data: searchResults } = useSearchSongs(searchQuery);
  const { mutate: logoutUser } = useLogout();
  const router = useRouter();

  const displaySongs = searchQuery ? searchResults : songs;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-3">
            <Music className="h-8 w-8 text-purple-600 animate-pulse" />
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Your Music Haven
            </h1>
          </div>
          <div className="flex w-full md:w-auto gap-4">
            <div className="relative flex-1 md:w-72 transition-all duration-300">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
              <Input
                className="pl-10 bg-white border-purple-200 focus:border-purple-400 focus:ring-purple-200 rounded-lg shadow-sm"
                placeholder="Search your melodies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AddSongDialog />
            <Button
              onClick={() => {
                logoutUser();
              }}
              className="bg-red-600 text-white"
              variant="secondary"
            >
              Logout
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 rounded-xl animate-pulse shadow-sm"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displaySongs?.map((song) => (
              <SongCard key={song.id} song={song} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
