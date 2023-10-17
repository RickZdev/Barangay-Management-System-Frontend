import { useMutation } from "@tanstack/react-query";
import { createResident } from "../../services/apiHelper";

const useCreateResident = () => {
  const resident = useMutation({
    mutationFn: createResident,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      return err;
    },
  });

  return resident;
};

export default useCreateResident;
