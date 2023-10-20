import { useQuery } from "@tanstack/react-query";
import { getAllComplaints } from "../../services/apiHelper";

const useGetComplaints = () => {
  const complaints = useQuery(["allComplaints"], getAllComplaints, {
    onSuccess: (data) => {
      console.log("FETCHED ALL COMPLAINTS: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
  });

  return complaints;
};

export default useGetComplaints;
