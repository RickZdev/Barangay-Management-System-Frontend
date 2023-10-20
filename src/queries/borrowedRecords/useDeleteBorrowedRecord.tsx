import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBorrowedRecord } from "../../services/apiHelper";

const useDeleteBorrowedRecord = () => {
  const queryClient = useQueryClient();

  const borrowedRecord = useMutation({
    mutationFn: deleteBorrowedRecord,
    onSuccess: () => queryClient.invalidateQueries(["allBorrowedRecords"]),
    onError: (err) => {
      console.log(err, "nice");
    },
  });

  return borrowedRecord;
};

export default useDeleteBorrowedRecord;
