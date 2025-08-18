import logoutIcon from "../../../assets/svg/Logout.svg";

const LogOutBtn = () => {

  return (
    <button
      className="text-[#EF4444] p-4 flex items-center gap-[10px] max-w-max"
    >
      <img src={logoutIcon} alt="logout" className="w-[24px] h-[24px]" />
      <span>Logout</span>
    </button>
  );
};

export default LogOutBtn;
