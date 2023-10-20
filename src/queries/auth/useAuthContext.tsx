import { useContext } from "react";
import { AuthContext, AuthContextType } from "../../context/ContextProvider";

const useAuthContext = (): AuthContextType => {
  const context = useContext<AuthContextType | null>(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};

export default useAuthContext;
