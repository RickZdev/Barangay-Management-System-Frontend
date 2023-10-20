import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSulatReklamo } from "../../services/apiHelper";

const useDeleteSulatReklamo = () => {
  const queryClient = useQueryClient();
  const sulatReklamo = useMutation({
    mutationFn: deleteSulatReklamo,
    onSuccess: () => queryClient.invalidateQueries(["allSulatReklamo"]),
    onError: (err) => {
      console.log(err);
    },
  });

  return sulatReklamo;
};

export default useDeleteSulatReklamo;
