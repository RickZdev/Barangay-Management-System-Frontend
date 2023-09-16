import { useQuery } from "@tanstack/react-query";
import { getAllOfficials } from "../../services/apiHelper";

const useGetOfficials = () => {
  const officials = useQuery(["allOfficials1"], getAllOfficials, {
    onSuccess: (data) => {
      console.log("FETCHED RESIDENT: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
  });

  return officials;
};

export default useGetOfficials;
