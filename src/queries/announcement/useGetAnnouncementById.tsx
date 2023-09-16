import { useQuery } from "@tanstack/react-query";
import { getAnnouncementById } from "../../services/apiHelper";

const useGetAnnouncementById = (announcementId: string | undefined) => {
  const announcement = useQuery(
    ["announcement", announcementId],
    () => getAnnouncementById(announcementId),
    {
      onSuccess: (data) => {
        console.log("FETCHED ANNOUNCEMENT: ", data);
      },
      onError: (error) => {
        console.log(error, "asdas");
      },
    }
  );

  return announcement;
};

export default useGetAnnouncementById;
