import { useQuery } from "@tanstack/react-query";
import { getAllAnnouncements } from "../../services/apiHelper";

const useGetAnnouncements = () => {
  const announcements = useQuery(["allAnnouncements"], getAllAnnouncements, {
    onSuccess: (data) => {
      console.log("FETCHED ALL ANNOUNCEMENTS: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
  });

  return announcements;
};

export default useGetAnnouncements;
