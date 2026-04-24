'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { Toaster } from 'react-hot-toast';
import type { NoteTag } from '@/types/note';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import Link from 'next/link';
import css from '../../NotesPage.module.css';

const PER_PAGE = 12;

interface FilterNotesClientProps {
  tag?: NoteTag;
}

export default function FilterNotesClient({ tag }: FilterNotesClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, searchValue, tag],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        perPage: PER_PAGE,
        search: searchValue,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchValue(value.trim());
    setCurrentPage(1);
  }, 500);

  const handlePageChange = (selectedPage: number): void => {
    setCurrentPage(selectedPage);
  };

  const handleSearchChange = (value: string): void => {
    setInputValue(value);
    debouncedSearch(value);
  };

  return (
    <>
      <main className={css.app}>
        <header className={css.toolbar}>
          <SearchBox value={inputValue} onChange={handleSearchChange} />

          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}

          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        </header>

        {isLoading && <p>Loading, please wait...</p>}
        {isError && <p>Something went wrong. Please try again.</p>}

        {!isLoading && !isError && notes.length > 0 && (
          <NoteList notes={notes} />
        )}

        {!isLoading && !isError && notes.length === 0 && <p>No notes found.</p>}
      </main>

      <Toaster position="top-right" />
    </>
  );
}
