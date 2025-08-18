import { useState, useRef, useEffect } from "react";
import bosch from "../../../assets/profile.png";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import useAuthStore from "../../../store/useAuthStore";
import { useModalStore } from "../../../store/useModalStore copy";

const UserProfile = () => {
  const toggle = useModalStore((state) => state.toggle);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [openUserModal, setOpenUserModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
        <span className="hidden lg:block text-sm text-[#BBBBBB] font-medium">
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
          className="w-full max-w-[300px] absolute top-[70px] right-[16px] bg-white rounded-md shadow-lg"
        >
          <button onClick={toggle} className="text-black border-b border-[#ddd] p-4 flex items-center gap-2 w-full hover:bg-gray-100 transition">
            <IoSettingsOutline className="text-2xl" />
            <span>Settings</span>
          </button>
          <button
            onClick={logout}
            className="text-red-600 p-4 flex items-center gap-2 w-full hover:bg-gray-100 transition"
          >
            <CiLogout className="text-2xl" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </>
  );
};

export default UserProfile;
