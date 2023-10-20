import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/apiHelper";

const useUpdateUser = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  const user = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log("success!", data);
      queryClient.invalidateQueries(["user", userId]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return user;
};

export default useUpdateUser;
