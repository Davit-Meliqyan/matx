import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Spin } from "antd";
import CompanyInputs from "./CompanyInputs";
import CompanyLogoUpload from "./CompanyLogoUpload";
import CompanyButtons from "./CompanyButtons";
import { Company } from "../../../../../types/item.interface";
import { useDynamicFetchStore } from "../../../../../store/useDynamicFetchStore";

const requiredFields = [
  { key: "name", label: "Name" },
  { key: "shortName", label: "Company short name" },
  { key: "address", label: "Address" },
  { key: "website", label: "Website" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone" },
];

const CompanyForm = () => {
  const companies = useDynamicFetchStore((state) => state.items["company"]);
  const fetchItems = useDynamicFetchStore((state) => state.fetchItems);
  const updateItem = useDynamicFetchStore((state) => state.updateItem);
  const createItem = useDynamicFetchStore((state) => state.createItem);

  const [mode, setMode] = useState(false);
  const [formData, setFormData] = useState<Company>({
    name: "",
    shortName: "",
    email: "",
    phoneNumber: "",
    address: "",
    website: "",
  });
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems("company").finally(() => setLoading(false));
  }, [fetchItems]);

  useEffect(() => {
    if (companies && companies.length > 0) {
      const company = companies[0];
      setMode(true);
      setFormData({
        name: company.name ?? "",
        shortName: company.shortName ?? "",
        email: company.email ?? "",
        phoneNumber: company.phoneNumber ?? "",
        address: company.address ?? "",
        website: company.website ?? "",
      });
      setFileName(company.logoURL ?? "");
      localStorage.setItem("matx_company", company.id);
    }
  }, [companies]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = localStorage.getItem("matx_company");

    if (!id) {
      toast.error("User ID not specified for update");
      return;
    }

    for (const field of requiredFields) {
      if (!formData[field.key as keyof Company]?.trim()) {
        return toast.warn(`${field.label} field is empty`);
      }
    }

    if (mode) {
      await updateItem("company", { id, ...formData });
      toast.success("Company updated");
    } else {
      await createItem("company", formData);
      toast.success("Company created");
      setMode(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      shortName: "",
      email: "",
      phoneNumber: "",
      address: "",
      website: "",
      logoURL: "",
    });
    setFileName("");
  };

  return (
    <div className="flex flex-col gap-5 relative">
      <h3 className="text-2xl font-semibold">Company</h3>

      <form
        className="max-w-[620px] flex flex-col gap-5 relative"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <CompanyInputs
          requiredFields={requiredFields}
          formData={formData}
          setFormData={setFormData}
        />

        {mode && (
          <CompanyLogoUpload fileName={fileName} setFileName={setFileName} />
        )}

        <CompanyButtons />

        {loading && (
          <div className="bg-white/70 flex justify-center items-center h-full absolute inset-0 z-20">
            <Spin size="large" />
          </div>
        )}
      </form>
    </div>
  );
};

export default CompanyForm;
