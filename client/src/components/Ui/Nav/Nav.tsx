import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

type Child = { to: string; title: string; all?: boolean };

type ParentItem = {
  id: string;
  title: string;
  children: Child[];
};

type LeafItem = {
  id: string;
  title: string;
  to: string;
};

type NavItem = ParentItem | LeafItem;

const navItems: NavItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    id: "administration",
    title: "Administration",
    children: [
      { to: "/administration/company", title: "Company" },
      { to: "/administration/members", title: "Members" },
      { to: "/administration/roles", title: "Roles" },
    ],
  },
  {
    id: "orders",
    title: "Orders",
    children: [
      { to: "/orders/upcoming", title: "Upcoming" },
      { to: "/orders/progress", title: "In progress" },
      { to: "/orders/history", title: "History" },
    ],
  },
  {
    id: "production",
    title: "Production",
    children: [
      { to: "/production/upcoming", title: "Upcoming" },
      { to: "/production/progress", title: "In progress" },
      { to: "/production/history", title: "History" },
    ],
  },
  {
    id: "batch_record",
    title: "Batch Record",
    to: "/batch_record",
  },
  {
    id: "storage",
    title: "Storage",
    to: "/storage",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    to: "/maintenance",
  },
  {
    id: "clients",
    title: "Clients",
    to: "/clients",
  },
  {
    id: "equipment",
    title: "Equipment",
    children: [
      { to: "/equipment/cyclotron", title: "Cyclotron" },
      { to: "/equipment/hot_lab", title: "Hot Lab" },
      { to: "/equipment/qc", title: "QC" },
    ],
  },
  {
    id: "radiotracers",
    title: "Radioisotopes and radiopharmaceuticals",
    children: [
      { to: "/radiotracers/radioisotopes", title: "Radioisotopes" },
      {
        to: "/radiotracers/radiopharmaceuticals",
        title: "Radiopharmaceuticals",
      },
    ],
  },
  {
    id: "subsystems",
    title: "Subsystems",
    children: [
      { to: "/subsystems/gas_system", title: "Gas system" },
      {
        to: "/subsystems/air_compressor",
        title: "Air compressor",
      },
      {
        to: "/subsystems/radiation_safety",
        title: "Radiation safety",
      },
    ],
  },
  {
    id: "sop",
    title: "SOP",
    to: "/sop",
  },
  {
    id: "settings",
    title: "Settings",
    to: "/settings",
  },
];

function isParentItem(item: NavItem): item is ParentItem {
  return Array.isArray((item as ParentItem).children);
}

const Nav = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const active = navItems.find(
      (item) =>
        isParentItem(item) &&
        item.children.some((c) => pathname.startsWith(c.to))
    );
    if (active) setOpenItem(active.id);
  }, [pathname]);

  const handleToggle = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <nav className="w-full flex flex-col gap-2 px-2 text-sm">
      {navItems.map((item) =>
        isParentItem(item) ? (
          <div key={item.id} className="w-full flex flex-col gap-2">
            <button
              onClick={() => handleToggle(item.id)}
              className={`
    w-full flex items-start gap-2 p-2 text-left rounded 
    text-gray-700 dark:text-white
    ${openItem === item.id ? "bg-gray-100 dark:bg-gray-700" : ""}
    hover:transition-colors hover:duration-300 hover:bg-gray-100 dark:hover:bg-gray-700
  `}
            >
              {item.title}
              <i className="ml-auto">
                {openItem === item.id ? (
                  <MdKeyboardArrowDown className="text-xl" />
                ) : (
                  <MdKeyboardArrowRight className="text-xl" />
                )}
              </i>
            </button>
            <div
              className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                openItem === item.id ? "max-h-[500px]" : "max-h-0"
              }`}
            >
              <div className="pl-4 border-l border-gray-200 dark:border-gray-700 flex flex-col gap-1">
                {item.children.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    className={`
    p-2 rounded
    ${
      pathname.startsWith(child.to)
        ? "bg-gray-200 text-gray-900 font-medium dark:bg-gray-700 dark:text-white"
        : "text-gray-600 dark:text-gray-300"
    }
    hover:transition-colors hover:duration-300
    hover:bg-gray-100 hover:text-gray-900
    dark:hover:bg-gray-700 dark:hover:text-white
  `}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Link
            key={item.id}
            to={(item as LeafItem).to}
            className={`
    flex items-center gap-2 p-2 rounded
    ${
      pathname === (item as LeafItem).to
        ? "bg-gray-200 text-gray-900 font-medium dark:bg-gray-700 dark:text-white"
        : "text-gray-700 dark:text-white"
    }
    hover:transition-colors hover:duration-300
    hover:bg-gray-100 hover:text-gray-900
    dark:hover:bg-gray-700
  `}
          >
            {item.title}
          </Link>
        )
      )}
    </nav>
  );
};

export default Nav;
