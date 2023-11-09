import { useQuery } from "@tanstack/react-query";
import { getAllRejectedCertificates } from "../../services/apiHelper";

const useGetRejectedCertificates = () => {
  const certificates = useQuery(
    ["allRejectedCertificates"],
    getAllRejectedCertificates
  );
  return certificates;
};

export default useGetRejectedCertificates;
