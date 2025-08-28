import { useState, useRef, useEffect } from "react";
import bosch from "../../../assets/profile.png";
import { CiLight, CiLogout } from "react-icons/ci";
import useAuthStore from "../../../store/useAuthStore";
import { useTheme } from "../../../hooks/ThemeContext";
import { MdDarkMode } from "react-icons/md";

const UserProfile = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [openUserModal, setOpenUserModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        openUserModal &&
        modalRef.current &&
        !modalRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setOpenUserModal(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openUserModal]);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => setOpenUserModal((prev) => !prev)}
        className="flex items-center gap-3 p-4 cursor-pointer select-none"
      >
        <span className="hidden lg:block text-sm text-gray-600 dark:text-gray-300 font-medium">
          {user?.name || "User"}
        </span>
        <img
          src={user?.avatar || bosch}
          alt="profile"
          className="w-[28px] h-[28px] rounded-full"
          draggable={false}
        />
      </div>

      {openUserModal && (
        <div
          ref={modalRef}
          className="w-full max-w-[300px] absolute top-[70px] right-[16px] rounded-md shadow-lg 
          bg-white text-gray-800 border border-gray-200
          dark:bg-[#1f2937] dark:text-white dark:border-gray-700"
        >
          <button
            onClick={logout}
            className="p-4 flex items-center gap-2 w-full text-red-600 hover:bg-gray-100 transition 
            dark:hover:bg-gray-600 dark:hover:text-red-400"
          >
            <CiLogout className="text-2xl" />
            <span>Logout</span>
          </button>

          {/* Toggle */}
          <div className="ml-auto px-4 py-2 flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "light" ? "dark" : "light")}
              />
              <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 dark:bg-gray-600 rounded-full peer peer-checked:bg-gray-700 transition-colors"></div>
              <span className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform peer-checked:translate-x-6 flex items-center justify-center">
                {theme === "dark" ? (
                  <MdDarkMode className="text-yellow-400" />
                ) : (
                  <CiLight className="text-yellow-500" />
                )}
              </span>
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
