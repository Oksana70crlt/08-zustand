import type { Metadata } from 'next';
import { OG_IMAGE, SITE_NAME } from '@/lib/metadata';
import css from './Home.module.css';

//метадані для сторінки 404
export const metadata: Metadata = {
  title: `404 - Page not found | ${SITE_NAME}`,
  description:
    'The page you are looking for does not exist in the NoteHub application.',
  openGraph: {
    title: `404 - Page not found | ${SITE_NAME}`,
    description:
      'The page you are looking for does not exist in the NoteHub application.',
    url: '/not-found',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} not found page`,
      },
    ],
  },
};

export default function NotFound() {
  return (
    <main>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description} style={{ textAlign: 'center' }}>
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
