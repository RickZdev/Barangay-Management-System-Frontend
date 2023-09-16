import { useQuery } from "@tanstack/react-query";
import { getAdminById } from "../../services/apiHelper";

const useGetAdminById = (adminId: string | undefined) => {
  const admin = useQuery(["admin", adminId], () => getAdminById(adminId), {
    onSuccess: (data) => {
      console.log("FETCHED ADMIN: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
  });

  return admin;
};

export default useGetAdminById;
