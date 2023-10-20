import { useQuery } from "@tanstack/react-query";
import { getComplaintById } from "../../services/apiHelper";

const useGetComplaintById = (complaintId: string | undefined) => {
  const complaint = useQuery(
    ["complaint", complaintId],
    () => getComplaintById(complaintId),
    {
      onSuccess: (data) => {
        console.log("FETCHED COMPLAINT: ", data);
      },
      onError: (error) => {
        console.log(error, "asdas");
      },
    }
  );

  return complaint;
};

export default useGetComplaintById;
