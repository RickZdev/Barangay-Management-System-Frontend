import { useQuery } from "@tanstack/react-query";
import { getResidentStatuses } from "../../services/apiHelper";

const useGetResidentStatuses = () => {
  const residents = useQuery(["allResidentStatuses"], getResidentStatuses);

  return residents;
};

export default useGetResidentStatuses;
