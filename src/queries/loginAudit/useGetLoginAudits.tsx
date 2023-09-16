import { useQuery } from "@tanstack/react-query";
import { getAllLoginAudits } from "../../services/apiHelper";

const useGetLoginAudits = () => {
  const loginAudits = useQuery(["allLoginAudits"], getAllLoginAudits, {
    onSuccess: (data) => {
      console.log("FETCHED ALL LOGIN AUDITS: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
  });

  return loginAudits;
};

export default useGetLoginAudits;
