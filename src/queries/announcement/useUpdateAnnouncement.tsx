import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAnnouncement } from "../../services/apiHelper";
import useFirebaseStorage from "../../hooks/useFirebaseStorage";

const useUpdateAnnouncement = (announcementId?: string) => {
  const queryClient = useQueryClient();

  const { handleDeleteImage } = useFirebaseStorage();

  const announcement = useMutation({
    mutationFn: updateAnnouncement,
    onSuccess: async (data: any) => {
      console.log("success!", data);
      if (data?.data) {
        await handleDeleteImage(data?.data?.announcementImage);
      }

      queryClient.invalidateQueries(["announcement", announcementId]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return announcement;
};

export default useUpdateAnnouncement;
