import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdmin } from "../../services/apiHelper";

const useDeleteAdmin = () => {
  const queryClient = useQueryClient();
  const admin = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => queryClient.invalidateQueries(["allAdmins"]),
    onError: (err) => {
      console.log(err);
    },
  });

  return admin;
};

export default useDeleteAdmin;
