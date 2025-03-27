'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateSong } from '@/hooks/use-songs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, Music } from 'lucide-react';
import { CreateSongDTO } from '@/types/song';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  genre: z.string().optional(),
  coverImageUrl: z.string().optional(),
});

export function AddSongDialog() {
  const [open, setOpen] = useState(false);
  const createSong = useCreateSong();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      artist: '',
      genre: '',
      coverImageUrl: '',
    },
  });

  async function onSubmit(values: CreateSongDTO) {
    await createSong.mutateAsync(values);
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          New Melody
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-purple-600" >
            <Music className="h-5 w-5" />
            Add New Song
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Title</FormLabel>
                  <FormControl>
                    <Input
                      className="border-purple-200 focus:border-purple-400"
                      placeholder="Enter song title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Artist</FormLabel>
                  <FormControl>
                    <Input
                      className="border-purple-200 focus:border-purple-400"
                      placeholder="Enter artist name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Genre</FormLabel>
                  <FormControl>
                    <Input
                      className="border-purple-200 focus:border-purple-400"
                      placeholder="Enter genre (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Cover Image</FormLabel>
                  <FormControl>
                    <Input
                      className="border-purple-200 focus:border-purple-400"
                      placeholder="Enter image URL (optional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            >
              Create song
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}