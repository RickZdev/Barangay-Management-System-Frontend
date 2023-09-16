import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResident } from "../../services/apiHelper";

const useDeleteResident = () => {
  const queryClient = useQueryClient();
  const resident = useMutation({
    mutationFn: deleteResident,
    onSuccess: () => {
      queryClient.invalidateQueries(["allResidents"]);
    },

    onError: (err) => {
      console.log(err);
    },
  });

  return resident;
};

export default useDeleteResident;
