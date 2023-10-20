import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlotter } from "../../services/apiHelper";

const useUpdateBlotter = (blotterId: string | undefined) => {
  const queryClient = useQueryClient();
  const blotter = useMutation({
    mutationFn: updateBlotter,
    onSuccess: (data) => {
      console.log("success!", data);
      queryClient.invalidateQueries(["blotter", blotterId]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return blotter;
};

export default useUpdateBlotter;
