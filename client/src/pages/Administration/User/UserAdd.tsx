import UserForm from "./UserForm";

const UserAdd = () => {
  return (
    <div className="w-full h-full flex flex-col items-start gap-5 p-5 rounded-2xl bg-[#FFFFFF]">
      <UserForm mode={true} />
    </div>
  );
};

export default UserAdd;
