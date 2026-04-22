export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

//опис одного обєкта Note, який містить інформацію про нотатку, включаючи її ідентифікатор, заголовок, вміст, тег та дати створення та оновлення.
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}
