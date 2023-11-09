import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCertificate } from "../../services/apiHelper";

const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  const certificate = useMutation({
    mutationFn: updateCertificate,
    onSuccess: (data) => {
      console.log("success!", data);
      queryClient.invalidateQueries(["allApprovedCertificates"]);
      queryClient.invalidateQueries(["allPendingCertificates"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return certificate;
};

export default useUpdateCertificate;
