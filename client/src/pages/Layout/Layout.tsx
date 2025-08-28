import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Ui/Sidebar/Sidebar";
import Header from "../../components/Ui/Header/Header";
import { memo, Suspense } from "react";
import { useSidebarStore } from "../../store/useSidebarStore";

const Layout = () => {
  const isOpenSid = useSidebarStore((state) => state.isOpen);

  return (
    <div className="min-h-screen flex relative bg-[#ecf0f2] dark:bg-[#1e1e2a] text-gray-900 dark:text-white">
      {/* Sidebar слева */}
      <Sidebar />

      {/* Основной контент справа от Sidebar */}
      <div
        className={`${
          isOpenSid ? "w-full lg:w-[calc(100%-240px)]" : "w-full"
        } flex flex-col ml-auto transition-[width] duration-300 bg-[#ecf0f2] dark:bg-[#141d31]`}
      >
        {/* Header на весь верхний ряд */}
        <Header />
        <Suspense fallback={<div className="text-gray-700 dark:text-gray-300">Layout render...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(Layout);
