import { useQuery } from "@tanstack/react-query";
import { getAllTransactions } from "../../services/apiHelper";

const useGetTransactions = () => {
  const transactions = useQuery(["allTransactions"], getAllTransactions, {
    onSuccess: (data) => {
      console.log("FETCHED ALL TRANSACTIONS: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
  });

  return transactions;
};

export default useGetTransactions;
