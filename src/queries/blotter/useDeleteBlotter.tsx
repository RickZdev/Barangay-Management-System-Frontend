import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlotter } from "../../services/apiHelper";

const useDeleteBlotter = () => {
  const queryClient = useQueryClient();
  const blotter = useMutation({
    mutationFn: deleteBlotter,
    onSuccess: () => queryClient.invalidateQueries(["allBlotters"]),
    onError: (err) => {
      console.log(err);
    },
  });

  return blotter;
};

export default useDeleteBlotter;
