import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComplaint } from "../../services/apiHelper";

const useDeleteComplaint = () => {
  const queryClient = useQueryClient();
  const complaint = useMutation({
    mutationFn: deleteComplaint,
    onSuccess: () => queryClient.invalidateQueries(["allComplaints"]),
    onError: (err) => {
      console.log(err);
    },
  });

  return complaint;
};

export default useDeleteComplaint;
