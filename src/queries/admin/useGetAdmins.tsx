import { useQuery } from "@tanstack/react-query";
import { getAllAdmins } from "../../services/apiHelper";

const useGetAdmins = () => {
  const admins = useQuery(["allAdmins"], getAllAdmins, {
    onSuccess: (data) => {
      console.log("FETCHED ALL TRANSACTIONS: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
  });

  return admins;
};

export default useGetAdmins;
