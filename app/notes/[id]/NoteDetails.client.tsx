'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api/fetchNoteById';
import { useParams } from 'next/navigation';
import css from './NoteDetails.module.css';

function NoteDetailsClient() {
  //отримуємо дінамічний параметр id з URL за допомогою useParams
  const params = useParams<{ id: string }>();
  const id = params.id;

  // Використовуємо useQuery для отримання даних нотатки за її id
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong.</p>;
  }

  // Форматуємо дату створення нотатки для відображення у зручному форматі
  const createdDate = new Date(note.createdAt).toLocaleString();

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>Created: {createdDate}</p>
      </div>
    </div>
  );
}

export default NoteDetailsClient;
