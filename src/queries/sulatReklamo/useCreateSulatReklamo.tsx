import { useMutation } from "@tanstack/react-query";
import { createSulatReklamo } from "../../services/apiHelper";

const useCreateSulatReklamo = () => {
  const sulatReklamo = useMutation({
    mutationFn: createSulatReklamo,
    onSuccess: async (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return sulatReklamo;
};

export default useCreateSulatReklamo;
