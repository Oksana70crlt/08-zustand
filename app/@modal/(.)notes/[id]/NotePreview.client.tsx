'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import css from '@/components/NotePreview/NotePreview.module.css';

export default function NotePreviewClient() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;

  const { data: note, isLoading, isError, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    staleTime: 60 * 1000,
    refetchOnMount: false
  });

  const handleClose = (): void => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>Loading, please wait...</p>}

      {isError && (
        <p>Could not fetch note details. {error.message}</p>
      )}

      {!isLoading && !isError && note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <span className={css.tag}>{note.tag}</span>
            </div>

            <p className={css.content}>{note.content}</p>

            <p className={css.date}>
              {new Date(note.createdAt).toLocaleDateString('uk-UA', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </p>

            <button
              type="button"
              className={css.backBtn}
              onClick={handleClose}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}