import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../services/apiHelper";

const useCreateUser = () => {
  const user = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return user;
};

export default useCreateUser;
