import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeFill } from "react-icons/ri";
import { useSidebarStore } from "../../../store/useSidebarStore";

const SidebarToggleButton = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggle = useSidebarStore((state) => state.toggle);

  return (
    <button onClick={toggle} className="p-4">
      {isOpen ? (
        <RiCloseLargeFill className="text-[24px] text-gray-800 dark:text-white" />
      ) : (
        <RxHamburgerMenu className="text-[24px] text-gray-800 dark:text-white" />
      )}
    </button>
  );
};

export default SidebarToggleButton;
