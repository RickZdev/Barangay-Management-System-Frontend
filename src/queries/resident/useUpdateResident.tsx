import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResident } from "../../services/apiHelper";

const useUpdateResident = (residentId: string | undefined) => {
  const queryClient = useQueryClient();
  const resident = useMutation({
    mutationFn: updateResident,
    onSuccess: (data) => {
      console.log("success!", data);
      queryClient.invalidateQueries(["resident", residentId]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return resident;
};

export default useUpdateResident;
