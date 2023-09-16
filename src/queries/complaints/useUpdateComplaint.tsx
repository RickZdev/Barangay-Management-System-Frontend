import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComplaint } from "../../services/apiHelper";

const useUpdateComplaint = (complaintId: string | undefined) => {
  const queryClient = useQueryClient();
  const complaint = useMutation({
    mutationFn: updateComplaint,
    onSuccess: (data) => {
      console.log("success!", data);
      queryClient.invalidateQueries(["complaint", complaintId]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return complaint;
};

export default useUpdateComplaint;
