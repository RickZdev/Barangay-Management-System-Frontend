import { useQuery } from "@tanstack/react-query";
import { getAllResidents } from "../../services/apiHelper";

const useGetResidents = () => {
  const residents = useQuery(["allResidents"], getAllResidents, {
    onSuccess: (data) => {
      console.log("FETCHED ALL RESIDENTS: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
    refetchOnMount: "always",
  });

  return residents;
};

export default useGetResidents;
