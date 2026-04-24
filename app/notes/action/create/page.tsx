import type { Metadata } from 'next';
import { OG_IMAGE, SITE_NAME } from '@/lib/metadata';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: `Create note | ${SITE_NAME}`,
  description: 'Create a new note in the NoteHub application.',
  openGraph: {
    title: `Create note | ${SITE_NAME}`,
    description: 'Create a new note in the NoteHub application.',
    url: '/notes/action/create',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Create note page',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
