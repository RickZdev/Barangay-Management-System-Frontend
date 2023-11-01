import toast from "react-hot-toast";
import { UserRolePropType } from "../utils/types";

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

export const loginSuccessNotify = (userRole: UserRolePropType) =>
  toast.success(`Logged in as ${userRole}.`, {
    duration: 2000,
  });

export const logoutSuccessNotify = () =>
  toast.success(`You are now logged out.`, {
    duration: 2000,
  });

export const tokenExpiredNotify = () => {
  toast.error(
    `Reset Password token either not valid or expired. Please try again.`,
    {
      duration: 4000,
    }
  );
};

export const noUserFoundNotify = () => {
  toast.error(`Not a valid user.`, {
    duration: 4000,
  });
};
