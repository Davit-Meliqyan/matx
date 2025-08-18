import { useLocation } from "react-router-dom";

export const useRouteSection = () => {
  const { pathname } = useLocation();

  const section = (() => {
    if (pathname.includes("/members")) return "members";
    if (pathname.includes("/company")) return "company";
    if (pathname.includes("/positions")) return "positions";
    if (pathname.includes("/roles")) return "roles";
    if (pathname.includes("/permissions")) return "permissions";
    if (pathname.includes("/access")) return "access";
    return "";
  })();

  const index = pathname.indexOf(`/${section}`);
  const basePath =
    index !== -1
      ? pathname.slice(0, index + section.length + 1).replace(/\/+$/, "")
      : "";

  const buildPath = (suffix: string) => `${basePath}/${suffix}`;

  return {
    pathname,
    section,
    basePath,
    buildPath,
  };
};
