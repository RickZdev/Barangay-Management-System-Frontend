import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCertificate } from "../../services/apiHelper";

const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  const certificate = useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => queryClient.invalidateQueries(["allApprovedCertificates"]),
    onError: (err) => {
      console.log(err);
    },
  });

  return certificate;
};

export default useDeleteCertificate;
