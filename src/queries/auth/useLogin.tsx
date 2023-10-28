import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../services/apiHelper";

import _ from "lodash";

const useLogin = () => {
  const login = useMutation({
    mutationFn: loginUser,
  });

  return login;
};

export default useLogin;
