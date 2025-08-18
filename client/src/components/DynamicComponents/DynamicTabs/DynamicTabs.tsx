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
    <div className="w-full h-[50px] shrink-0 flex gap-5 !border-solid !border-b !border-[#E3EBF1]">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`min-w-[130px] font-semibold py-4 text-left !border-b-2 !border-solid ${
            activeTab === id
              ? "!border-[#253AA6] text-[#253AA6] "
              : "!border-transparent text-gray-500 hover:text-[#253AA6]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default DynamicTabs;
