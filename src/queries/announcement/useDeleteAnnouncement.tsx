import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAnnouncement } from "../../services/apiHelper";
import useFirebaseStorage from "../../hooks/useFirebaseStorage";

const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  const { handleDeleteImage } = useFirebaseStorage();

  const announcement = useMutation({
    mutationFn: deleteAnnouncement,
    onSuccess: async (data: any) => {
      console.log("success!", data);
      if (data?.data) {
        await handleDeleteImage(data?.data?.announcementImage);
      }

      queryClient.invalidateQueries(["allAnnouncements"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return announcement;
};

export default useDeleteAnnouncement;
