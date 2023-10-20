import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTransaction } from "../../services/apiHelper";

const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  const transaction = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => queryClient.invalidateQueries(["allTransactions"]),
    onError: (err) => {
      console.log(err);
    },
  });

  return transaction;
};

export default useDeleteTransaction;
