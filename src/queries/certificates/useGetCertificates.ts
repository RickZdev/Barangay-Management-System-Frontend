import { useQuery } from "@tanstack/react-query";
import { getAllCertificates } from "../../services/apiHelper";

const useGetCertificates = () => {
  const certificates = useQuery(["allCertificates"], getAllCertificates);
  return certificates;
};

export default useGetCertificates;
