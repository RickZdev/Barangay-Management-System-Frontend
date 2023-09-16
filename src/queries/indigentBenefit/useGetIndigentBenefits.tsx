import { useQuery } from "@tanstack/react-query";
import { getAllIndigentBenefit } from "../../services/apiHelper";

const useGetIndigentBenefits = () => {
  const indigentBenefits = useQuery(
    ["allIndigentBenefits"],
    getAllIndigentBenefit,
    {
      onSuccess: (data) => {
        console.log("FETCHED INDIGENT BENEFITS: ", data);
      },
      onError: (error) => {
        console.log(error, "asdas");
      },
    }
  );

  return indigentBenefits;
};

export default useGetIndigentBenefits;
