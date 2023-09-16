import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdmin } from "../../services/apiHelper";

const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  const admin = useMutation({
    mutationFn: createAdmin,
    onSuccess: (data) => {
      console.log("success!", data);
      queryClient.invalidateQueries(["allAdmins"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return admin;
};

export default useCreateAdmin;
