import { useMutation } from "@tanstack/react-query";
import { createAnnouncement } from "../../services/apiHelper";

const useCreateAnnouncement = () => {
  const announcement = useMutation({
    mutationFn: createAnnouncement,
    onSuccess: async (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return announcement;
};

export default useCreateAnnouncement;
