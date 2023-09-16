import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSulatReklamo } from "../../services/apiHelper";

const useUpdateSulatReklamo = (sulatReklamoId: string | undefined) => {
  const queryClient = useQueryClient();
  const sulatReklamo = useMutation({
    mutationFn: updateSulatReklamo,
    onSuccess: (data) => {
      console.log("success!", data);
      queryClient.invalidateQueries(["sulatReklamo", sulatReklamoId]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return sulatReklamo;
};

export default useUpdateSulatReklamo;
