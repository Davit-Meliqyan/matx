import { ChangeEvent, useRef } from "react";
import DynamicInput from "../DynamicComponents/DynamicInput/DynamicInput";

type FormData = {
  company_name: string;
  short_name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  logo: string;
};

type Props = {
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
};

const CompanyFormFields = ({ formData, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange("logo", reader.result as string); // base64
      };
      reader.readAsDataURL(file);
    }
  };

  const clearLogo = () => {
    onChange("logo", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };

  return (
    <div className="w-[280px] flex flex-col gap-2">
      <DynamicInput
        label="Company name*"
        value={formData.company_name}
        type="text"
        onChange={(e) => onChange("company_name", e.target.value)}
      />
      <DynamicInput
        label="Company short name*"
        value={formData.short_name}
        type="text"
        onChange={(e) => onChange("short_name", e.target.value)}
      />
      <DynamicInput
        label="Address*"
        value={formData.address ?? ""}
        type="text"
        onChange={(e) => onChange("address", e.target.value)}
      />
      <DynamicInput
        label="Phone*"
        value={formData.phone ?? ""}
        type="text"
        onChange={(e) => onChange("phone", e.target.value)}
      />
      <DynamicInput
        label="E-mail*"
        value={formData.email}
        type="text"
        onChange={(e) => onChange("email", e.target.value)}
      />
      <DynamicInput
        label="Website*"
        value={formData.website}
        type="text"
        onChange={(e) => onChange("website", e.target.value)}
      />

      {/* 👇 File input для логотипа */}
      <div className="flex items-center justify-between gap-3 mt-5 flex-wrap">
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          id="file"
          accept="image/*"
          onChange={handleLogoChange}
        />
        <label
          htmlFor="file"
          className="cursor-pointer p-3 text-center border border-solid border-black"
        >
          Attach logo
        </label>
      </div>

      {/* 👇 Preview загруженного логотипа */}
      {formData.logo && (
        <div className="flex flex-col items-end gap-3 mt-2 max-w-max">
          <button
            type="button"
            onClick={clearLogo}
            className="text-red-500 hover:underline text-[20px]"
          >
            x
          </button>
          <img
            src={formData.logo}
            alt="Company logo"
            className="w-24 h-auto object-contain border border-gray-300 rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default CompanyFormFields;
