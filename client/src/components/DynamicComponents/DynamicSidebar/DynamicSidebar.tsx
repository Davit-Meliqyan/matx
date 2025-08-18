import { FiPlus } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useRouteSection } from "../../../hooks/useRouteSection";
import React from "react";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";

const items = [
  { id: 1, name: "Alice", isVerified: true },
  { id: 2, name: "Bob", isVerified: false },
  { id: 3, name: "Charlie", isVerified: true },
];

const DynamicSidebar = () => {
  const { section, buildPath } = useRouteSection();

  return (
    <div className="w-full max-w-[400px] h-full sticky top-[0px] flex flex-col gap-5 p-3  rounded-lg bg-[#FFFFFF]">
      <div className="w-full flex justify-between gap-2 items-center">
        <span className="text-lg font-semibold">
          {section.charAt(0).toUpperCase() + section.slice(1)}
        </span>
        <Link
          to={buildPath("add")}
          className="flex items-center gap-2 py-2 px-3 rounded bg-[#01344F] text-[#ffffff] transition-all duration-300 hover:bg-[#226186]"
        >
          Add
          <FiPlus className="text-[#ffffff]" />
        </Link>
      </div>

      <div className="w-full h-full flex flex-col gap-2">
        {items?.length === 0 ? (
          <p className="text-center text-gray-500">No items found</p>
        ) : (
          items.map((item) => (
            <NavLink
              key={item.id}
              to={buildPath(`edit/${item.id}`)}
              className={({ isActive }) =>
                `w-full text-lg py-4 px-3 flex justify-between items-center gap-2 rounded-md text-start transition-all duration-300 ${
                  isActive
                    ? "bg-[#01344F] text-[#ffffff]"
                    : "text-[#000000] bg-[#dddddd] hover:bg-[#0B527C] hover:text-[#ffffff]"
                } `
              }
            >
              {item.name}
              {section === "members" ? (
                item.isVerified === false ? (
                  <GoUnverified className="text-red-600 text-[24px]" />
                ) : (
                  <MdVerified className="text-green-600 text-[24px]" />
                )
              ) : null}
            </NavLink>
          ))
        )}
      </div>
    </div>
  );
};

export default React.memo(DynamicSidebar);
