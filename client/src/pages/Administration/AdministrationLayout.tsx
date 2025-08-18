import { Outlet } from "react-router-dom";
import { memo, Suspense } from "react";
import DynamicSidebar from "../../components/DynamicComponents/DynamicSidebar/DynamicSidebar";

const AdministrationLayout = () => {

  return (
    <main className="flex items-start gap-3 p-4">
      <DynamicSidebar />
      <Suspense fallback={<div>AdministrationLayout render...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default memo(AdministrationLayout);
