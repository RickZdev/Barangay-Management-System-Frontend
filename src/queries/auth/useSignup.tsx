import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../services/apiHelper";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const signup = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return signup;
};

export default useSignup;
