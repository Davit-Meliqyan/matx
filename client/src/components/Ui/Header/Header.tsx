import SidebarToggleButton from "./SidebarToggleButton";
import UserProfile from "./UserProfile";
import HeaderLayout from "./HeaderLayout";
import { memo } from "react";
import Logo from "../Logo/Logo";

const Header = () => {
  return (
    <HeaderLayout>
      <SidebarToggleButton />
      <Logo />
      <UserProfile />
    </HeaderLayout>
  );
};

export default memo(Header);
