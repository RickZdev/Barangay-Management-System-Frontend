import { useQueryClient } from "@tanstack/react-query";
import useAuthContext from "./useAuthContext";

// import Storage from '../data/Storage';

const useLogout = () => {
  const authContext = useAuthContext();

  const handleLogout = async (): Promise<void> => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("accessToken");

    authContext.setUserRole(null);
    authContext.setAccessToken(null);
    authContext.setUserId(null);

    console.log("User has been logged out.");
  };

  return handleLogout;
};

export default useLogout;
