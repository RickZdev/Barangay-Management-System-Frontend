import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOfficial } from "../../services/apiHelper";

const useDeleteOfficial = () => {
  const queryClient = useQueryClient();
  const official = useMutation({
    mutationFn: deleteOfficial,
    onSuccess: () => queryClient.invalidateQueries(["allOfficials1"]),
    onError: (err) => {
      console.log(err);
    },
  });

  return official;
};

export default useDeleteOfficial;
