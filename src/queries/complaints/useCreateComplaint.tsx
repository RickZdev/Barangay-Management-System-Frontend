import { useMutation } from "@tanstack/react-query";
import { createComplaint } from "../../services/apiHelper";

const useCreateComplaint = () => {
  const complaint = useMutation({
    mutationFn: createComplaint,
    onSuccess: async (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return complaint;
};

export default useCreateComplaint;
