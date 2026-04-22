import notehubApi from './apiClient';
import type { Note, NoteTag } from '@/types/note';

//тип для параметрів які потрібні для запиту нотаток з API
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

//функція для створення нової нотатки, яка приймає об'єкт з даними нотатки та повертає створену нотатку з API
export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const { data } = await notehubApi.post<Note>('/notes', payload);
  return data;
}
