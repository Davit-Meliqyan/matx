import { memo } from "react";
import { useSidebarStore } from "../../../store/useSidebarStore";
import Nav from "../Nav/Nav";

const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);

  return (
    <aside
      className={`h-[calc(100vh-60px)] top-[60px] flex flex-col gap-5 z-20 fixed lg:h-screen lg:top-0 custom-scroll lg:sticky shrink-0 py-4 bg-gray-900 !border-r !border-solid !border-gray-700 transition-all duration-300 ${
        isOpen
          ? "left-0 w-[240px] overflow-y-auto"
          : "left-[-100%] w-[240px] lg:w-[0px] lg:overflow-hidden"
      }`}
    >
      <Nav />
    </aside>
  );
};

export default memo(Sidebar);
