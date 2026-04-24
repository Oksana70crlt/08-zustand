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

//опис спільний тип для draftу нотатки, який містить заголовок, вміст та тег. Цей тип використовується для створення нової нотатки або редагування існуючої, де ідентифікатор та дати ще не визначені.
export interface NoteDraft {
  title: string;
  content: string;
  tag: NoteTag;
}
