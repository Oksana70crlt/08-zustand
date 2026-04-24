import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import type { Metadata } from 'next';
import { OG_IMAGE, SITE_NAME } from '@/lib/metadata';

interface MetadataProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: `${note.title} |${SITE_NAME}`,
    description: note.content.slice(0, 100),
    openGraph: {
      title: `${note.title} | ${SITE_NAME}`,
      description: note.content.slice(0, 100),
      url: `/notes/${id}`,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

interface NoteDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
