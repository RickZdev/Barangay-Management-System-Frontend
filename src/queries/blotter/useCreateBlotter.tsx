import { useMutation } from "@tanstack/react-query";
import { createBlotter } from "../../services/apiHelper";

const useCreateBlotter = () => {
  const blotter = useMutation({
    mutationFn: createBlotter,
    onSuccess: async (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return blotter;
};

export default useCreateBlotter;
