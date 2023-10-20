import { useQuery } from "@tanstack/react-query";
import { getBorrowedInventoryById } from "../../services/apiHelper";

const useGetBorrowedInventoryById = (
  borrowedInventoryId: string | undefined
) => {
  const borrowedInventory = useQuery(
    ["borrowedInventory", borrowedInventoryId],
    () => getBorrowedInventoryById(borrowedInventoryId),
    {
      onSuccess: (data) => {
        console.log("FETCHED BORROWED INVENTORY: ", data);
      },
      onError: (error) => {
        console.log(error, "asdas");
      },
    }
  );

  return borrowedInventory;
};

export default useGetBorrowedInventoryById;
