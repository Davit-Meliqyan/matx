import { useEffect } from "react";
import { useDynamicFetchStore } from "../../../store/useDynamicFetchStore";

const Logo = () => {
  const companies = useDynamicFetchStore((state) => state.items["company"]);
  const fetchItems = useDynamicFetchStore((state) => state.fetchItems);

  useEffect(() => {
    fetchItems("company");
  }, [fetchItems]);

  return (
    <div className="px-4 py-2 h-[60px] flex justify-center w-full max-w-[240px]">
      {companies?.[0].logoURL ? (
        <img
          src={`/images/files/${companies?.[0].logoURL}`}
          alt="Logo"
          className="h-full object-contain"
        />
      ) : (
        <h2 className="text-white text-2xl font-bold">{companies?.[0].name}</h2>
      )}
    </div>
  );
};

export default Logo;
