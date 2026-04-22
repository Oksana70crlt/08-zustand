import notehubApi from './apiClient';
import type { Note } from '@/types/note';

export async function fetchNoteById(noteId: string): Promise<Note> {
  const { data } = await notehubApi.get<Note>(`/notes/${noteId}`);
  return data;
}
