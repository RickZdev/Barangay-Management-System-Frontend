import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/apiHelper";
import { useNavigate } from "react-router-dom";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
  const authContext = useAuthContext();

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      localStorage.setItem("userId", JSON.stringify(data._id));
      localStorage.setItem("userRole", JSON.stringify(data.userRole));
      localStorage.setItem("accessToken", JSON.stringify(data.token));

      authContext.setUserId(data._id);
      authContext.setUserRole(data.userRole);
      authContext.setAccessToken(data.token);

      console.log(data);
    },
  });

  return login;
};

export default useLogin;
