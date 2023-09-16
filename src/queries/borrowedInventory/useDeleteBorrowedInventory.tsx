import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBorrowedInventory } from "../../services/apiHelper";

const useDeleteBorrowedInventory = () => {
  const queryClient = useQueryClient();
  const borrowedInventory = useMutation({
    mutationFn: deleteBorrowedInventory,
    onSuccess: () => queryClient.invalidateQueries(["allBorrowedInventory"]),
    onError: (err) => {
      console.log(err);
    },
  });

  return borrowedInventory;
};

export default useDeleteBorrowedInventory;
