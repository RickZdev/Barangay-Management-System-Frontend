import { useMutation } from "@tanstack/react-query";
import { createBorrowedInventory } from "../../services/apiHelper";

const useCreateBorrowedInventory = () => {
  const borrowedInventory = useMutation({
    mutationFn: createBorrowedInventory,
    onSuccess: async (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return borrowedInventory;
};

export default useCreateBorrowedInventory;
