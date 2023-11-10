import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import TopBar from "../../components/TopBar";
import ModalAddTransaction from "../../components/modals/ModalAddTransaction";
import ModalAddAdminAccount from "../../components/modals/ModalAddAdminAccount";
import SidebarRouter from "../routes/SidebarRouter";
import useAuthContext from "../../queries/auth/useAuthContext";
import { COLORS } from "../../constants/COLORS";

export const RootLayout: React.FC = () => {
  return <Outlet />;
};

export const HomepageLayout: React.FC = () => {
  return <Outlet />;
};

export const AuthLayout: React.FC = () => {
  return <Outlet />;
};

export const SidebarLayout: React.FC = () => {
  // const [openAddTransaction, setOpenAddTransaction] = useState<boolean>(false);
  // const [openAdminAccount, setOpenAdminAccount] = useState<boolean>(false);

  // dark mode
  const backgroundColor = COLORS.background;

  // light mode
  // const backgroundColor = `rgb(243, 244, 248)`;

  const navigate = useNavigate();

  const auth = useAuthContext();

  useEffect(() => {
    const userId = localStorage?.getItem("userId")
      ? JSON.parse(localStorage?.getItem("userId")!)
      : null;
    const userRole = localStorage?.getItem("userRole")
      ? JSON.parse(localStorage?.getItem("userRole")!)
      : null;
    const token = localStorage?.getItem("accessToken")
      ? JSON.parse(localStorage?.getItem("accessToken")!)
      : null;

    if (userId && token) {
      auth.setUserId(userId);
      auth.setUserRole(userRole);
      auth.setAccessToken(token);
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="flex flex-row h-screen">
      <SidebarRouter />
      <main
        className="flex-1 overflow-auto"
        style={{ background: backgroundColor }}
      >
        <TopBar />
        <div className="px-8 pt-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export const AnnouncementLayout: React.FC = () => {
  const userRole = localStorage?.getItem("userRole")
    ? JSON.parse(localStorage?.getItem("userRole")!)
    : null;

  return (
    <>
      {userRole === "Resident" ? <Navigate to="/unauthorized" /> : <Outlet />}
    </>
  );
};

export const BarangayOfficialLayout: React.FC = () => {
  return <Outlet />;
};

export const ResidentLayout: React.FC = () => {
  const userRole = localStorage?.getItem("userRole")
    ? JSON.parse(localStorage?.getItem("userRole")!)
    : null;

  return (
    <>
      {userRole === "Resident" ? <Navigate to="/unauthorized" /> : <Outlet />}
    </>
  );
};

export const ProfileLayout: React.FC = () => {
  return <Outlet />;
};

export const BlotterLayout: React.FC = () => {
  return <Outlet />;
};

export const ComplaintsLayout: React.FC = () => {
  return <Outlet />;
};

export const SulatReklamoLayout: React.FC = () => {
  return <Outlet />;
};

export const CertificateLayout: React.FC = () => {
  return <Outlet />;
};

export const InventoryLayout: React.FC = () => {
  return <Outlet />;
};

export const TransactionLayout: React.FC = () => {
  return <Outlet />;
};

export const IndigentLayout: React.FC = () => {
  return <Outlet />;
};

export const AdminLayout: React.FC = () => {
  const userRole = localStorage?.getItem("userRole")
    ? JSON.parse(localStorage?.getItem("userRole")!)
    : null;

  return (
    <>
      {userRole === "Resident" ? <Navigate to="/unauthorized" /> : <Outlet />}
    </>
  );
};
