import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIndigentBenefit } from "../../services/apiHelper";

const useCreateIndigentBenefit = () => {
  const queryClient = useQueryClient();

  const indigentBenefit = useMutation({
    mutationFn: createIndigentBenefit,
    onSuccess: async (data) => {
      queryClient.invalidateQueries(["allIndigentBenefits"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return indigentBenefit;
};

export default useCreateIndigentBenefit;
