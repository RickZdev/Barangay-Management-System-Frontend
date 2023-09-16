import { useQuery } from "@tanstack/react-query";
import { getAllSulatReklamo } from "../../services/apiHelper";

const useGetSulatReklamo = () => {
  const sulatReklamo = useQuery(["allSulatReklamo"], getAllSulatReklamo, {
    onSuccess: (data) => {
      console.log("FETCHED ALL SULAT REKLAMO: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
  });

  return sulatReklamo;
};

export default useGetSulatReklamo;
