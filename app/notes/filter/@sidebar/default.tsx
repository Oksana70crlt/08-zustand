import SidebarNotes from './SidebarNotes';
import { filterTags } from '../filterTags';

export default function SidebarDefault() {
  return <SidebarNotes tags={filterTags} />;
}
