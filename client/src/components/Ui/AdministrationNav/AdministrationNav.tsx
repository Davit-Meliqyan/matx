import {
  MdBusiness,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { useSidebarStore } from "../../../store/useSidebarStore";

const AdministrationNav = () => {
  const { isOpenToggle, setIsOpenToggle } = useSidebarStore();

  return (
    <div className="w-full flex flex-col gap-2">
      <button
        onClick={() => setIsOpenToggle(!isOpenToggle)}
        className="w-full flex items-center gap-2 text-[#ffffff] p-2 rounded hover:text-white hover:bg-gray-700"
      >
        <MdBusiness className="text-[24px] shrink-0" />
        <span>Administration</span>

        <i className="ml-auto">
          {isOpenToggle ? (
            <MdKeyboardArrowDown className="text-[24px]" />
          ) : (
            <MdKeyboardArrowRight className="text-[24px]" />
          )}
        </i>
      </button>

      {/* {isOpenToggle && (
        <div className="pl-4 pr-2">
          <div className="w-full h-auto flex flex-col gap-1 pl-[14px] !border-solid !border-l !border-gray-700">
            <Link
              to="/administration/departments"
              className="w-full text-sm text-gray-300 p-2 rounded hover:text-[#ffffff] hover:bg-gray-700"
            >
              Departments
            </Link>
            <Link
              to="/administration/positions"
              className="w-full text-sm text-gray-300 p-2 rounded hover:text-[#ffffff] hover:bg-gray-700"
            >
              Positions
            </Link>
            <Link
              to="/administration/users"
              className="w-full text-sm text-gray-300 p-2 rounded hover:text-[#ffffff] hover:bg-gray-700"
            >
              Users
            </Link>
            <Link
              to="/administration/roles"
              className="w-full text-sm text-gray-300 p-2 rounded hover:text-[#ffffff] hover:bg-gray-700"
            >
              Roles
            </Link>
          </div>
        </div>
      )} */}
      <div
        className={`pl-4 pr-2 overflow-hidden transition-[max-height] duration-300 ${
          isOpenToggle ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="w-full h-auto flex flex-col gap-1 pl-[14px] border-solid border-l border-gray-700">
          <Link
            to="/administration/departments"
            className="w-full text-sm text-gray-300 p-2 rounded hover:text-white hover:bg-gray-700"
          >
            Departments
          </Link>
          <Link
            to="/administration/positions"
            className="w-full text-sm text-gray-300 p-2 rounded hover:text-white hover:bg-gray-700"
          >
            Positions
          </Link>
          <Link
            to="/administration/users"
            className="w-full text-sm text-gray-300 p-2 rounded hover:text-white hover:bg-gray-700"
          >
            Users
          </Link>
          <Link
            to="/administration/roles"
            className="w-full text-sm text-gray-300 p-2 rounded hover:text-white hover:bg-gray-700"
          >
            Roles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdministrationNav;
