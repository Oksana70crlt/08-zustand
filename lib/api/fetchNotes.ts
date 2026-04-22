import notehubApi from './apiClient';
import type { Note, NoteTag } from '@/types/note';

//тип для параметрів які потрібні для запиту нотаток з API, включаючи пагінацію, пошук та фільтрацію за тегом
export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: NoteTag;
}

//інтерфейс уже нормалізованої відповіді, з якою буде працювати React-код
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

//тип для даних, які потрібно відправити при створенні нової нотатки
export async function fetchNotes({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search && search.trim() !== '') {
    params.search = search.trim();
  }

  if (tag) {
    params.tag = tag;
  }

  const { data } = await notehubApi.get<FetchNotesResponse>('/notes', {
    params,
  });

  return data;
}
