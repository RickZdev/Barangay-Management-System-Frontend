import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export type AuthContextType = {
  userId: string | null | undefined;
  setUserId: Dispatch<SetStateAction<string | null | undefined>>;
  userRole: 'Resident' | 'Captain' | 'Administrators' | 'Secretary';
  setUserRole: Dispatch<SetStateAction<'Resident' | 'Captain' | 'Administrators' | 'Secretary'>>;
  accessToken: string | null | undefined;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null | undefined>(null);
  const [userRole, setUserRole] = useState<'Resident' | 'Captain' | 'Administrators' | 'Secretary'>('Resident');
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        userId,
        setUserId,
        userRole,
        setUserRole,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { ContextProvider, AuthContext };
