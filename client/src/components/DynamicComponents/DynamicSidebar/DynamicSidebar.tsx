import { FiPlus } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useRouteSection } from "../../../hooks/useRouteSection";
import React, { useEffect } from "react";
import { useDynamicFetchStore } from "../../../store/useDynamicFetchStore";

const DynamicSidebar = () => {
  const { section, buildPath } = useRouteSection();
  const rawItems = useDynamicFetchStore((state) => state.items[section]);
  const items = Array.isArray(rawItems) ? rawItems : [];
  const fetchItems = useDynamicFetchStore((state) => state.fetchItems);

  useEffect(() => {
    if (!section) return;
    fetchItems(section);
  }, [section, fetchItems]);

  return (
    <div
      className="w-full max-w-[320px] h-full sticky top-0 flex flex-col gap-5 p-3 rounded-lg 
                    bg-white dark:bg-[#111827] "
    >
      <div className="w-full flex justify-between gap-2 items-center">
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </span>
        <Link
          to={buildPath("add")}
          className="flex items-center gap-2 py-2 px-3 rounded bg-[#01344F] text-white 
                     transition-all duration-300 hover:bg-[#226186]"
        >
          Add
          <FiPlus className="text-white" />
        </Link>
      </div>

      <div className="w-full h-[calc(100vh-180px)] overflow-y-auto pr-2">
        <div className="w-full h-auto flex flex-col gap-2 ">
          {items?.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No items found
            </p>
          ) : (
            items.map((item) => (
              <NavLink
                key={item.id}
                to={buildPath(`edit/${item.id}`)}
                className={({ isActive }) =>
                  `w-full text-lg py-4 px-3 flex justify-between items-center gap-2 rounded-md text-start
    ${
      isActive
        ? "bg-[#01344F] text-white"
        : "bg-gray-200 text-gray-900 dark:bg-[#141d31] dark:text-gray-200"
    }
    hover:transition-colors hover:duration-300 hover:bg-[#0B527C] hover:text-white dark:hover:bg-[#0B527C] dark:hover:text-white
    `
                }
              >
                {item.name}
              </NavLink>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DynamicSidebar);
