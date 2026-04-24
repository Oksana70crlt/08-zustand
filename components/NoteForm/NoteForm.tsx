'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import css from './NoteForm.module.css';
import { initialDraft, useNoteStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api';
import type { NoteTag, NoteDraft } from '@/types/note';

// Компонент форми для створення нотатки
//==============================================================================
function NoteForm() {
  //повертає користувача на попередню сторінку після успішного створення нотатки або при скасуванні дії.
  const router = useRouter();
  // використовуємо useQueryClient для отримання доступу до клієнта React Query
  const queryClient = useQueryClient();

  // беремо поточну draft з Zustand store.
  const draft = useNoteStore(state => state.draft);
  const setDraft = useNoteStore(state => state.setDraft); // функція для оновлення draft у Zustand store.
  const clearDraft = useNoteStore(state => state.clearDraft); // функція для очищення draft у Zustand store, яка встановлює його назад до початкового стану.

  // mutation відповідає за створення нотатки на сервері.
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      toast.success('Note created successfully');
      router.back(); // повертає користувача на попередню сторінку після успішного створення нотатки
    },
    onError: () => {
      toast.error('Failed to create note');
    },
  });

  // handleChange викликається кожного разу,
  // коли користувач змінює input, textarea або select.
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;

    setDraft({
      ...draft,
      [name]: value,
    } as NoteDraft);
  };

  // handleSubmit спрацьовує при відправці форми.
  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title');
    const content = formData.get('content');
    const tag = formData.get('tag');

    if (
      typeof title !== 'string' ||
      typeof content !== 'string' ||
      typeof tag !== 'string'
    ) {
      toast.error('Invalid form data');
      return;
    }

    // відправляємо дані на сервер.
    mutation.mutate({
      title: title.trim(),
      content: content.trim(),
      tag: tag as NoteTag,
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.field}>
        Title
        <input
          className={css.input}
          type="text"
          name="title"
          defaultValue={draft.title || initialDraft.title}
          onChange={handleChange}
          required
        />
      </label>

      <label className={css.field}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          defaultValue={draft.content || initialDraft.content}
          onChange={handleChange}
          required
        />
      </label>

      <label className={css.field}>
        Tag
        <select
          className={css.select}
          name="tag"
          defaultValue={draft.tag || initialDraft.tag}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={css.actions}>
        <button
          className={css.submitBtn}
          type="submit"
          disabled={mutation.isPending}
        >
          Create
        </button>

        <button className={css.cancelBtn} type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default NoteForm;
