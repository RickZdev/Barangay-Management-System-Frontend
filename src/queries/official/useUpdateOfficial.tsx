import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOfficial } from "../../services/apiHelper";

const useUpdateOfficial = () => {
  const queryClient = useQueryClient();
  const official = useMutation({
    mutationFn: updateOfficial,
    onSuccess: (data) => {
      console.log("success!", data);
      queryClient.invalidateQueries(["allOfficials"]);
      queryClient.invalidateQueries(["official"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return official;
};

export default useUpdateOfficial;
