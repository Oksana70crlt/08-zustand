'use client';

import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import type { ComponentType } from 'react';
import css from './Pagination.module.css';

// Інтерфейс для пропсів компонента Pagination
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

type ReactPaginateModuleType = {
  default?: ComponentType<ReactPaginateProps>;
};

const ReactPaginate =
  (ReactPaginateModule as unknown as ReactPaginateModuleType).default ??
  (ReactPaginateModule as unknown as ComponentType<ReactPaginateProps>);

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
      breakLabel="..."
    />
  );
}

export default Pagination;
