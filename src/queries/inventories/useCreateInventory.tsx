import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInventory } from "../../services/apiHelper";

const useCreateInventory = () => {
  const queryClient = useQueryClient();

  const inventory = useMutation({
    mutationFn: createInventory,
    onSuccess: async (data) => {
      console.log(data);
      queryClient.invalidateQueries(["allInventories"]);
    },
  });

  return inventory;
};

export default useCreateInventory;
