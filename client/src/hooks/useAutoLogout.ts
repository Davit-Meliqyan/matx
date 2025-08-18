import { useEffect } from "react";
import useAuthStore from "../store/useAuthStore";

const useAutoLogout = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = !!user;

  useEffect(() => {
    if (!isAuthenticated) return;

    const lastActive = localStorage.getItem("lastActive");
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    if (lastActive && now - parseInt(lastActive, 10) > sevenDays) {
      logout();
      localStorage.removeItem("lastActive");
      window.location.href = "/sign-in";
    } else {
      localStorage.setItem("lastActive", now.toString());
    }
  }, [isAuthenticated, logout]);
};

export default useAutoLogout;
