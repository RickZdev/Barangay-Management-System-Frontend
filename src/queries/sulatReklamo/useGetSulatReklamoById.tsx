import { useQuery } from "@tanstack/react-query";
import { getSulatReklamoById } from "../../services/apiHelper";

const useGetSulatReklamoById = (sulatReklamoId: string | undefined) => {
  const sulatReklamo = useQuery(
    ["sulatReklamo", sulatReklamoId],
    () => getSulatReklamoById(sulatReklamoId),
    {
      onSuccess: (data) => {
        console.log("FETCHED SULAT REKLAMO: ", data);
      },
      onError: (error) => {
        console.log(error, "asdas");
      },
    }
  );

  return sulatReklamo;
};

export default useGetSulatReklamoById;
