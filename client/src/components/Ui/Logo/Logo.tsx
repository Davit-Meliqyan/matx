import { useEffect } from "react";
import { useDynamicFetchStore } from "../../../store/useDynamicFetchStore";

const API_BASE_URL_IMG =
  import.meta.env.VITE_API_IMG || "http://62.169.23.81:9000";

const Logo = () => {
  const companies = useDynamicFetchStore((state) => state.items["company"]);
  const fetchItems = useDynamicFetchStore((state) => state.fetchItems);

  useEffect(() => {
    fetchItems("company");
  }, [fetchItems]);

  return (
    <div className="px-4 py-2 h-[60px] flex justify-center items-center w-full max-w-[240px]">
      {companies?.[0]?.logoURL ? (
        <img
          src={`${API_BASE_URL_IMG}/files/${companies?.[0].logoURL}`}
          alt="Logo"
          className="h-full object-contain"
        />
      ) : (
        <h2 className="text-gray-800 dark:text-white text-2xl font-bold h-max">
          {companies?.[0]?.name}
        </h2>
      )}
    </div>
  );
};

export default Logo;
