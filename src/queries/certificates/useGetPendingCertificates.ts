import { useQuery } from "@tanstack/react-query";
import { getAllPendingCertificates } from "../../services/apiHelper";

const useGetPendingCertificates = () => {
  const certificates = useQuery(
    ["allPendingCertificates"],
    getAllPendingCertificates
  );
  return certificates;
};

export default useGetPendingCertificates;
