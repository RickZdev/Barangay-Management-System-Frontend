import { useQuery } from "@tanstack/react-query";
import { getAllResidents } from "../../services/apiHelper";

const useGetResidents = () => {
  const residents = useQuery(["allResidents"], getAllResidents, {
    refetchOnMount: "always",
  });

  return residents;
};

export default useGetResidents;
