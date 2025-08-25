import { useRef } from "react";
import DynamicCheckbox from "../../../components/DynamicComponents/DynamicCheckbox/DynamicCheckbox";
import DynamicTopBar from "../../../components/DynamicComponents/DynamicTopBar/DynamicTopBar";
import DynamicInput from "../../../components/DynamicComponents/DynamicInput/DynamicInput";
import {
  PERMISSIONS,
  PermissionItem,
} from "../../../types/permissions.interface";

type FormData = { name: string };

type RolePayload = {
  name: string;
} & {
  [K in PermissionItem["code"]]: boolean;
};

type RolesFormProps = {
  mode: boolean;
  selectedPermissions: string[];
  onPermissionChange: (newSelected: string[]) => void;
  onSubmit: (payload: RolePayload) => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const RolesForm: React.FC<RolesFormProps> = ({
  mode,
  selectedPermissions,
  onPermissionChange,
  onSubmit,
  formData,
  setFormData,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSaveClick = () => formRef.current?.requestSubmit();

const handleCheckboxChangeInternal = (code: string, checked: boolean) => {
  const item = PERMISSIONS.find(i => i.code === code);
  if (!item) return;

  const groupItems = PERMISSIONS
    .filter(i => i.group === item.group)
    .sort((a, b) => a.level - b.level);

  let newSelected = [...selectedPermissions];

  if (checked) {
    // Включение → добавляем все права до уровня выбранного
    switch (item.level) {
      case 1: // view
        if (!newSelected.includes(item.code)) newSelected.push(item.code);
        break;
      case 2: // create
        groupItems.filter(i => i.level <= 2).forEach(i => {
          if (!newSelected.includes(i.code)) newSelected.push(i.code);
        });
        break;
      case 3: // edit
        groupItems.filter(i => i.level <= 3).forEach(i => {
          if (!newSelected.includes(i.code)) newSelected.push(i.code);
        });
        break;
      case 4: // delete
        groupItems.forEach(i => {
          if (!newSelected.includes(i.code)) newSelected.push(i.code);
        });
        break;
    }
  } else {
    // Снятие → можно снять только если нет выбранных уровней выше
    const maxSelectedLevel = Math.max(
      0,
      ...groupItems
        .filter(i => newSelected.includes(i.code))
        .map(i => i.level)
    );

    if (item.level === maxSelectedLevel) {
      // Снимаем все права с этим уровнем и выше
      groupItems
        .filter(i => i.level >= item.level)
        .forEach(i => {
          newSelected = newSelected.filter(c => c !== i.code);
        });
    }
    // Иначе ничего не снимаем (права выше блокируют)
  }

  onPermissionChange(newSelected);
};


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = PERMISSIONS.reduce(
      (acc, item) => {
        acc[item.code] = selectedPermissions.includes(item.code);
        return acc;
      },
      { name: formData.name } as RolePayload
    );

    onSubmit(payload);
  };

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <DynamicTopBar mode={mode} onSaveClick={handleSaveClick} />
      <div className="w-full h-full flex items-start justify-between flex-wrap gap-5 p-3 rounded-lg bg-white">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-[280px] flex flex-col gap-6"
        >
          <DynamicInput
            label="Name*"
            value={formData.name}
            type="text"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <div className="flex flex-col gap-4">
            {PERMISSIONS.map((item) => (
              <DynamicCheckbox
                key={item.id}
                data={item}
                checked={selectedPermissions.includes(item.code)}
                onChange={(checked) =>
                  handleCheckboxChangeInternal(item.code, checked)
                }
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RolesForm;
