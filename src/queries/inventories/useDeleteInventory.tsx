import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInventory } from "../../services/apiHelper";

const useDeleteInventory = () => {
  const queryClient = useQueryClient();
  const inventory = useMutation({
    mutationFn: deleteInventory,
    onSuccess: () => queryClient.invalidateQueries(["allInventories"]),
    onError: (err) => {
      console.log(err);
    },
  });

  return inventory;
};

export default useDeleteInventory;
