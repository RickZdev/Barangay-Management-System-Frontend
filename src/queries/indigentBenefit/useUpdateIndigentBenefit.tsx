import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIndigentBenefit } from "../../services/apiHelper";

const useUpdateIndigentBenefit = () => {
  const queryClient = useQueryClient();
  const indigentBenefit = useMutation({
    mutationFn: updateIndigentBenefit,
    onSuccess: (data) => {
      console.log("success!", data);
      queryClient.invalidateQueries(["allIndigentBenefits"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return indigentBenefit;
};

export default useUpdateIndigentBenefit;
