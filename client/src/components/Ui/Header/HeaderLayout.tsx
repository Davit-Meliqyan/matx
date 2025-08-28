import { memo } from "react";

const HeaderLayout = ({ children }: { children: React.ReactNode }) => (
  <header
    className="
      h-[60px] sticky top-0 z-30
      bg-[#f8f9fa] text-gray-800 border-b border-gray-200
      dark:bg-[#111827] dark:text-white dark:border-gray-700
    "
  >
    <div className="flex items-center justify-between relative">{children}</div>
  </header>
);

export default memo(HeaderLayout);
