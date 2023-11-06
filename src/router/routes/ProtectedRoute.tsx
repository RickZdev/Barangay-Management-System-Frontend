import { Navigate } from "react-router-dom";
import useAuthContext from "../../queries/auth/useAuthContext";

const ProtectedRoute = ({
  unauthorizedRoles,
  RouteName,
}: {
  unauthorizedRoles: string[];
  RouteName: React.ComponentType<any>;
}) => {
  const auth = useAuthContext();

  return (
    <>
      {unauthorizedRoles.includes(auth?.userRole ?? "") ? (
        <Navigate to="/unauthorized" />
      ) : (
        <RouteName />
      )}
    </>
  );
};

export default ProtectedRoute;
