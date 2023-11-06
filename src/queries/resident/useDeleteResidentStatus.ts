import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResidentStatus } from "../../services/apiHelper";

const useDeleteResidentStatus = () => {
  const queryClient = useQueryClient();

  const resident = useMutation({
    mutationFn: deleteResidentStatus,
    onSuccess: async (data: any) => {
      console.log("deleted successfully!", data);
      queryClient.invalidateQueries(["allResidentStatuses"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return resident;
};

export default useDeleteResidentStatus;
