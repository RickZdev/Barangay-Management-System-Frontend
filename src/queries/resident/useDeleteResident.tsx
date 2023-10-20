import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResident } from "../../services/apiHelper";
import useFirebaseStorage from "../../hooks/useFirebaseStorage";

const useDeleteResident = () => {
  const queryClient = useQueryClient();

  const { handleDeleteImage } = useFirebaseStorage();

  const resident = useMutation({
    mutationFn: deleteResident,
    onSuccess: async (data: any) => {
      console.log("success!", data);
      if (data?.data?.profilePhoto) {
        await handleDeleteImage(data?.data?.profilePhoto);
      }

      queryClient.invalidateQueries(["allResidents"]);
    },

    onError: (err) => {
      console.log(err);
    },
  });

  return resident;
};

export default useDeleteResident;
