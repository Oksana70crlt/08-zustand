import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import type { NoteTag } from '@/types/note';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';
import { OG_IMAGE, SITE_NAME } from '@/lib/metadata';

// метадані для сторінки фільтрації нотаток за тегом
interface MetadataProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { slug } = await params;

  const rawTag = decodeURIComponent(slug[0]);
  const tag = rawTag === 'all' ? 'All notes' : rawTag;

  return {
    title: `Notes: ${tag} | ${SITE_NAME}`,
    description: `Browse ${tag} notes in the ${SITE_NAME} application.`,
    openGraph: {
      title: `Notes: ${tag} | ${SITE_NAME}`,
      description: `Browse ${tag} notes in the ${SITE_NAME} application.`,
      url: `/notes/filter/${rawTag}`,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} notes page`,
        },
      ],
    },
  };
}

const PER_PAGE = 12;

interface FilterNotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterNotesPage({
  params,
}: FilterNotesPageProps) {
  const { slug } = await params;

  if (!slug || slug.length !== 1) {
    notFound();
  }

  const rawTag = decodeURIComponent(slug[0]);
  const tag = rawTag === 'all' ? undefined : (rawTag as NoteTag);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: PER_PAGE,
        search: '',
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tag ?? 'all'} tag={tag} />
    </HydrationBoundary>
  );
}
