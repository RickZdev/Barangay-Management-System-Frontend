import { useQuery } from "@tanstack/react-query";
import { getAllBorrowedInventory } from "../../services/apiHelper";

const useGetBorrowedInventory = () => {
  const borrowedInventory = useQuery(
    ["allBorrowedInventory"],
    getAllBorrowedInventory,
    {
      onSuccess: (data) => {
        console.log("FETCHED ALL BORROWED INVENTORY: ", data);
      },
      onError: (error) => {
        console.log(error, "asdas");
      },
    }
  );

  return borrowedInventory;
};

export default useGetBorrowedInventory;
