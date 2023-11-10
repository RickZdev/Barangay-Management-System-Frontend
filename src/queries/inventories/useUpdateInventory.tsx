import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInventory } from "../../services/apiHelper";

const useUpdateInventory = () => {
  const queryClient = useQueryClient();
  const inventory = useMutation({
    mutationFn: updateInventory,
    onSuccess: (data) => {
      console.log("success!", data);
      queryClient.invalidateQueries(["allInventories"]);
    },
  });

  return inventory;
};

export default useUpdateInventory;
