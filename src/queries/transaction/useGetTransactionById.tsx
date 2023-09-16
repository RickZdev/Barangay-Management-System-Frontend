import { useQuery } from "@tanstack/react-query";
import { getTransactionById } from "../../services/apiHelper";

const useGetTransactionById = (transactionId: string | undefined) => {
  const transaction = useQuery(
    ["transaction", transactionId],
    () => getTransactionById(transactionId),
    {
      onSuccess: (data) => {
        console.log("FETCHED TRANSACTION: ", data);
      },
      onError: (error) => {
        console.log(error, "asdas");
      },
    }
  );

  return transaction;
};

export default useGetTransactionById;
