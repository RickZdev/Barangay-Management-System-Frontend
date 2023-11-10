import { useQuery } from "@tanstack/react-query";
import { getAllInventories } from "../../services/apiHelper";

const useGetInventories = () => {
  const inventories = useQuery(["allInventories"], getAllInventories, {
    onSuccess: (data) => {
      console.log("FETCHED ALL INVENTORIES: ", data);
    },
  });

  return inventories;
};

export default useGetInventories;
