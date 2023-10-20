import { useQuery } from "@tanstack/react-query";
import { getBlotterById } from "../../services/apiHelper";

const useGetBlotterById = (blotterId: string | undefined) => {
  const blotter = useQuery(
    ["blotter", blotterId],
    () => getBlotterById(blotterId),
    {
      onSuccess: (data) => {
        console.log("FETCHED BLOTTER: ", data);
      },
      onError: (error) => {
        console.log(error, "asdas");
      },
    }
  );

  return blotter;
};

export default useGetBlotterById;
