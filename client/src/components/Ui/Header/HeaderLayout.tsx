import { memo } from "react";

const HeaderLayout = ({ children }: { children: React.ReactNode }) => (
  <header className="h-[60px] bg-gray-900 sticky top-0 z-30 transition-all duration-300">
    <div className="flex items-center justify-between relative">{children}</div>
  </header>
);

export default memo(HeaderLayout);
