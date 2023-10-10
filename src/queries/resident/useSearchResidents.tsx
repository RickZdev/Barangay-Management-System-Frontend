import { useQuery } from "@tanstack/react-query";
import {searchResidents } from "../../services/apiHelper";

const useSearchResidents = (searchText?: string) => {
  const residents = useQuery(["searchResidents", searchText ], () => searchResidents(searchText ?? ''), {
    onSuccess: (data) => {
      console.log("FETCHED ALL RESIDENTS: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
    enabled: searchText !== ''
  });

  return residents;
};

export default useSearchResidents;
