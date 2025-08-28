import { useTabsStore } from "../../../store/tabsStore";

type Tab = {
  id: string;
  label: string;
};

type DynamicTabsProps = {
  tabs: Tab[];
};

const DynamicTabs: React.FC<DynamicTabsProps> = ({ tabs }) => {
  const { activeTab, setActiveTab } = useTabsStore();

  return (
    <div className="w-full h-[50px] shrink-0 flex gap-5 !border-b !border-solid !border-gray-300 dark:!border-gray-700">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`min-w-[130px] font-semibold py-4 text-left !border-b-2 !border-solid
            ${
              activeTab === id
                ? "!border-[#253AA6] text-[#253AA6] dark:text-[#94a3b8]"
                : "!border-transparent text-gray-500 dark:text-gray-400 hover:text-[#253AA6] dark:hover:text-[#94a3b8]"
            } transition-colors duration-200`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default DynamicTabs;
