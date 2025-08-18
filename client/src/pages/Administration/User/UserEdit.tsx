import React from "react";
import UserForm from "./UserForm";
import DynamicTabs from "../../../components/DynamicComponents/DynamicTabs/DynamicTabs";
import { useTabsStore } from "../../../store/tabsStore";
import UserLicenses from "./UserLicenses";

const tabs = [
  { id: "info", label: "Member Info" },
  { id: "licenses", label: "Licenses" },
];


const UserEdit = () => {
  const { activeTab } = useTabsStore();

  return (
    <div className="w-[calc(100%-416px)] h-full flex flex-col items-start gap-5 p-5 rounded-2xl bg-[#FFFFFF]">
      <DynamicTabs tabs={tabs} />
      {activeTab === "info" ? (
        <UserForm mode={false} />
      ) : (
        <UserLicenses />
      )}
    </div>
  );
};

export default React.memo(UserEdit);
