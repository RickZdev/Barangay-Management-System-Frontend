import { useMutation } from "@tanstack/react-query";
import { createBorrowedRecord } from "../../services/apiHelper";

const useCreateBorrowedRecord = () => {
  const borrowedRecord = useMutation({
    mutationFn: createBorrowedRecord,
    onSuccess: async (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return borrowedRecord;
};

export default useCreateBorrowedRecord;
