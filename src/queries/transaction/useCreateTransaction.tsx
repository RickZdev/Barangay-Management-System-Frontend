import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTransaction } from "../../services/apiHelper";

const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const transaction = useMutation({
    mutationFn: createTransaction,
    onSuccess: async (data) => {
      console.log(data);
      queryClient.invalidateQueries(["allTransactions"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return transaction;
};

export default useCreateTransaction;
