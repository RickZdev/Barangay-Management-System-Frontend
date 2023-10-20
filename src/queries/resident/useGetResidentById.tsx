import { useQuery } from "@tanstack/react-query";
import { getResidentById } from "../../services/apiHelper";

const useGetResidentById = (residentId: string | undefined | null) => {
  const resident = useQuery(
    ["resident", residentId],
    () => getResidentById(residentId),
    {
      onSuccess: (data) => {
        console.log("FETCHED RESIDENT: ", data);
      },
      onError: (error) => {
        console.log(error, "asdas");
      },
      enabled: residentId ? true : false,
    }
  );

  return resident;
};

export default useGetResidentById;
