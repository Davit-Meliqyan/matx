import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Ui/Sidebar/Sidebar";
import Header from "../../components/Ui/Header/Header";
import { memo, Suspense } from "react";
import { useSidebarStore } from "../../store/useSidebarStore";

const Layout = () => {
  const isOpenSid = useSidebarStore((state) => state.isOpen);

  return (
    <div className="min-h-screen flex relative">
      {/* Sidebar слева во втором ряду */}
      <Sidebar />

      {/* Основной контент справа от Sidebar */}
      <div className={`${isOpenSid ? 'w-full lg:w-[calc(100%-240px)]' : 'w-full'} flex flex-col ml-auto transition-all duration-300`}>
        {/* Header на весь верхний ряд */}
        <Header />
        <Suspense fallback={<div>Layout render...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default memo(Layout);
