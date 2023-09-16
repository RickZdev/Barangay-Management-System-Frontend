import { useMutation } from "@tanstack/react-query";
import { createResident } from "../../services/apiHelper";

const useCreateResident = () => {
  const resident = useMutation({
    mutationFn: createResident,
    onSuccess: async (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return resident;
};

export default useCreateResident;
