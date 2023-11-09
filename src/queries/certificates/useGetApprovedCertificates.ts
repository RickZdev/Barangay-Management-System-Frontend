import { useQuery } from "@tanstack/react-query";
import { getAllApprovedCertificates } from "../../services/apiHelper";

const useGetApprovedCertificates = () => {
  const certificates = useQuery(
    ["allApprovedCertificates"],
    getAllApprovedCertificates
  );
  return certificates;
};

export default useGetApprovedCertificates;
