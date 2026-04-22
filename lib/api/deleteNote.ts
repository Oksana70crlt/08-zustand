import notehubApi from './apiClient';
import type { Note } from '@/types/note';

export async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await notehubApi.delete<Note>(`/notes/${noteId}`);
  return data;
}
