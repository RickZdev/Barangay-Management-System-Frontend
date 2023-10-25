import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResident } from "../../services/apiHelper";
import useFirebaseStorage from "../../hooks/useFirebaseStorage";

const useUpdateResident = (residentId: string | undefined) => {
  const queryClient = useQueryClient();

  const { handleDeleteImage } = useFirebaseStorage();

  const resident = useMutation({
    mutationFn: updateResident,
    onSuccess: async (data) => {
      console.log("success!", data);
      // if (data?.data?.profilePhoto) {
      //   await handleDeleteImage(data?.data?.profilePhoto);
      // }

      queryClient.invalidateQueries(["resident", residentId]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return resident;
};

export default useUpdateResident;
