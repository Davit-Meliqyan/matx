import DynamicCheckbox from "../../../../../components/DynamicComponents/DynamicCheckbox/DynamicCheckbox";
import { PERMISSIONS } from "../../../../../types/permissions.interface";

type PermissionsListProps = {
  selectedPermissions: string[];
  onChange: (newSelected: string[]) => void;
};

const PermissionsList: React.FC<PermissionsListProps> = ({ selectedPermissions, onChange }) => {
  const handleCheckboxChangeInternal = (code: string, checked: boolean) => {
    const item = PERMISSIONS.find((i) => i.code === code);
    if (!item) return;

    const groupItems = PERMISSIONS.filter((i) => i.group === item.group).sort(
      (a, b) => a.level - b.level
    );

    let newSelected = [...selectedPermissions];

    if (checked) {
      // Включение → добавляем все права до уровня выбранного
      groupItems
        .filter((i) => i.level <= item.level)
        .forEach((i) => {
          if (!newSelected.includes(i.code)) newSelected.push(i.code);
        });
    } else {
      // Снятие → снимаем права только если нет выбранных уровней выше
      const maxSelectedLevel = Math.max(
        0,
        ...groupItems.filter((i) => newSelected.includes(i.code)).map((i) => i.level)
      );

      if (item.level === maxSelectedLevel) {
        groupItems
          .filter((i) => i.level >= item.level)
          .forEach((i) => {
            newSelected = newSelected.filter((c) => c !== i.code);
          });
      }
    }

    onChange(newSelected);
  };

  return (
    <div className="flex flex-col gap-4">
      {PERMISSIONS.map((item) => (
        <DynamicCheckbox
          key={item.id}
          data={item}
          checked={selectedPermissions.includes(item.code)}
          onChange={(checked) => handleCheckboxChangeInternal(item.code, checked)}
        />
      ))}
    </div>
  );
};

export default PermissionsList;
