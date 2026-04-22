'use client';

import { useRouter } from 'next/navigation';
import type { Note } from '../../types/note';
import css from './NotePreview.module.css';

interface NotePreviewProps {
  note: Note;
}

//компонент для перегляду нотатки в модальному вікні
function NotePreview({ note }: NotePreviewProps) {
  //ініціалізуція роутера для навігації
  const router = useRouter();

  //форматування дати створення нотатки у форматі "дд.мм.рррр"
  const formattedDate = new Date(note.createdAt).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  //обробник події для повернення до попередньої сторінки
  const handleBack = (): void => {
    router.back();
  };

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <p className={css.content}>{note.content}</p>

        <p className={css.date}>{formattedDate}</p>

        <button type="button" className={css.backBtn} onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default NotePreview;
