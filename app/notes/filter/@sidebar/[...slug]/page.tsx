import SidebarNotes from '../SidebarNotes';
import { filterTags } from '../../filterTags';

export default function SidebarSlugPage() {
  return <SidebarNotes tags={filterTags} />;
}