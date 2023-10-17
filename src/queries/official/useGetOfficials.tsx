import { useQuery } from "@tanstack/react-query";
import { getAllOfficials } from "../../services/apiHelper";

const useGetOfficials = () => {
  const officials = useQuery(["allOfficials"], getAllOfficials, {
    onSuccess: (data) => {
      console.log("FETCHED RESIDENT: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
    refetchOnMount: "always",
  });

  return officials;
};

export default useGetOfficials;
