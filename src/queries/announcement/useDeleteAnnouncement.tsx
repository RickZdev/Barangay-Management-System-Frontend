import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncement } from "../../services/apiHelper";

const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();
  const announcement = useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: () => queryClient.invalidateQueries(["allAnnouncements"]),
    onError: (err) => {
      console.log(err);
    },
  });

  return announcement;
};

export default useDeleteAnnouncement;
