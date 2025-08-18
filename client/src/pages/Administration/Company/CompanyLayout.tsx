import { useTabsStore } from "../../../store/tabsStore";
import DynamicTabs from "../../../components/DynamicComponents/DynamicTabs/DynamicTabs";
import CompanyForm from "./Components/Company/CompanyForm";
import CompanyLicenses from "./Components/Licenses/CompanyLicenses";

const tabs = [
  { id: "info", label: "Company Info" },
  { id: "licenses", label: "Licenses" },
];

const CompanyLayout = () => {
  const { activeTab } = useTabsStore();

  return (
    <main className="flex flex-col items-start gap-3 p-4">
      <div className="w-full h-full flex flex-col items-start gap-5 p-5 rounded-2xl bg-[#FFFFFF]">
        <DynamicTabs tabs={tabs} />
        {activeTab === "info" ? (
          <CompanyForm />
        ) : (
          <CompanyLicenses />
        )}
      </div>
    </main>
  );
};

export default CompanyLayout;
