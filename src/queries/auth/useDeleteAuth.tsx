import { useMutation } from "@tanstack/react-query";
import { deleteAuthUser } from "../../services/apiHelper";

const useDeleteAuth = () => {
  const deleteUser = useMutation({
    mutationFn: deleteAuthUser,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return deleteUser;
};

export default useDeleteAuth;
