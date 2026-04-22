import Link from 'next/link';
import css from './SidebarNotes.module.css';
import type { NoteTag } from '@/types/note';


//тип пропсів для бокової панелі нотаток
interface SidebarNotesProps {
  tags: string[];
}

function SidebarNotes({ tags }: SidebarNotesProps) {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>

      {tags.map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link
            //кодуємо тег для безпечного використання в URL і створюємо посилання на сторінку фільтрації нотаток за цим тегом
            href={`/notes/filter/${encodeURIComponent(tag)}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SidebarNotes;
