import { MdBusiness, MdTrendingUp, MdTrendingDown, MdWarehouse } from "react-icons/md";

export type ChildItem = {
  to: string;
  title: string;
  section?: string;
  permission?: string;
};

export type LeafItem = {
  id: string;
  title: string;
  icon: React.ElementType;
  to: string;
  section?: string;
  children?: never;
  permission?: string;
};

export type ParentItem = {
  id: string;
  title: string;
  section?: string;
  icon: React.ElementType;
  children: ChildItem[];
  to?: never;
  permission?: string;
};

export type NavItem = LeafItem | ParentItem;

export type RawNavItem = {
  id: string;
  title: string;
  icon: string;
  section?: string;
  to?: string;
  children?: ChildItem[];
  permission?: string;
};

// Если хочешь, можешь экспортировать также iconMap отсюда:
export const iconMap: Record<string, React.ElementType> = {
  MdBusiness,
  MdTrendingUp,
  MdTrendingDown,
  MdWarehouse,
};
