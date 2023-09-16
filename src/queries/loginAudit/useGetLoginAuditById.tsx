import { useQuery } from "@tanstack/react-query";
import { getLoginAuditById } from "../../services/apiHelper";

const useGetLoginAuditById = (adminId: string | undefined) => {
  const announcement = useQuery(
    ["loginAudit", adminId],
    () => getLoginAuditById(adminId),
    {
      onSuccess: (data) => {
        console.log("FETCHED LOGIN AUDITS: ", data);
      },
      onError: (error) => {
        console.log(error, "asdas");
      },
    }
  );

  return announcement;
};

export default useGetLoginAuditById;
