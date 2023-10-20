import { useQuery } from "@tanstack/react-query";
import { getAllBlotters } from "../../services/apiHelper";

const useGetBlotters = () => {
  const blotters = useQuery(["allBlotters"], getAllBlotters, {
    onSuccess: (data) => {
      console.log("FETCHED ALL BLOTTERS: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
    refetchOnMount: "always",
  });

  return blotters;
};

export default useGetBlotters;
