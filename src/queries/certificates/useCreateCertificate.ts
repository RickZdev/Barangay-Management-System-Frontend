import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCertificate } from "../../services/apiHelper";

const useCreateCertificate = () => {
  const queryClient = useQueryClient();
  const certificate = useMutation({
    mutationFn: createCertificate,
    onSuccess: async (data) => {
      queryClient.invalidateQueries(["allPendingCertificates"]);
      console.log(data);
    },
  });

  return certificate;
};

export default useCreateCertificate;
