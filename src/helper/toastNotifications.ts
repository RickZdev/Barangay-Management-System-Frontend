import toast from "react-hot-toast";

export const refreshNotify = () =>
  toast.success("Refreshing...", {
    duration: 2000,
  });

export const loginAttemptsNotify = (attempts: number) => {
  toast.error(
    `${attempts} ${attempts > 1 ? "attempts" : "attempt"} remaining`,
    {
      duration: 4000,
    }
  );
};
