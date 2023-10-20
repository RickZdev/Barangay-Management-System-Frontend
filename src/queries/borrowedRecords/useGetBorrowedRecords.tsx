import { useQuery } from "@tanstack/react-query";
import { getAllBorrowedRecords } from "../../services/apiHelper";

const useGetBorrowedRecords = () => {
  const borrowedRecords = useQuery(
    ["allBorrowedRecords"],
    getAllBorrowedRecords,
    {
      onSuccess: (data) => {
        console.log("FETCHED ALL BORROWED RECORDS: ", data);
      },
      onError: (error) => {
        console.log(error, "asdas");
      },
    }
  );

  return borrowedRecords;
};

export default useGetBorrowedRecords;
