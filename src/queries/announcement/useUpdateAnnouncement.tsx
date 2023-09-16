import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouncement } from "../../services/apiHelper";

const useUpdateAnnouncement = (announcementId: string | undefined) => {
  const queryClient = useQueryClient();
  const announcement = useMutation({
    mutationFn: updateAnnouncement,
    onSuccess: (data) => {
      console.log("success!", data);
      queryClient.invalidateQueries(["announcement", announcementId]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return announcement;
};

export default useUpdateAnnouncement;
