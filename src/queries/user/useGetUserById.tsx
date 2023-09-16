import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/apiHelper";

const useGetUserById = (userId: string | undefined) => {
  const user = useQuery(["user", userId], () => getUserById(userId), {
    onSuccess: (data) => {
      console.log("FETCHED USER: ", data);
    },
    onError: (error) => {
      console.log(error, "asdas");
    },
  });

  return user;
};

export default useGetUserById;
