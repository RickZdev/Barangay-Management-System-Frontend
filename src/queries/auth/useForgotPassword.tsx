import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/apiHelper";

const useForgotPassword = () => {
  const response = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return response;
};

export default useForgotPassword;
