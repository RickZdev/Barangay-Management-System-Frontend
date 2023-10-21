import { useQuery } from "@tanstack/react-query";
import { getOfficialByPosition } from "../../services/apiHelper";
import useGetResidentById from "../resident/useGetResidentById";
import { OfficialPropType } from "../../utils/types";

const useGetOfficialByPosition = (position: string | undefined) => {
  const official = useQuery(
    ["official", position],
    () => getOfficialByPosition(position),
    {
      onError: (error) => {
        console.log(error, "asdas");
      },
      refetchOnWindowFocus: true,
    }
  );

  const details = useGetResidentById(official?.data?.data?.residentId);

  const data: OfficialPropType = {
    _id: official?.data?.data?._id,
    position: position,
    officialDetails: details.data,
  };

  return { data, isLoading: official.isLoading };
};

export default useGetOfficialByPosition;
