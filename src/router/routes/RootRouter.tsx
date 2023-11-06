import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "../../pages/sidebar/dashboard/Dashboard";
import Announcement from "../../pages/sidebar/announcement/Announcement";
import NotFound from "../../pages/errors/NotFound";
import BarangayOfficial from "../../pages/sidebar/officials/BarangayOfficial";
import Resident from "../../pages/sidebar/resident/Resident";
import ResidentAdd from "../../pages/sidebar/resident/ResidentAdd";
import ResidentView from "../../pages/sidebar/resident/ResidentView";
import AnnouncementAdd from "../../pages/sidebar/announcement/AnnouncementAdd";
import Blotter from "../../pages/sidebar/blotter/Blotter";
import BlotterAdd from "../../pages/sidebar/blotter/BlotterAdd";
import BlotterEdit from "../../pages/sidebar/blotter/BlotterEdit";
import LoginAudit from "../../pages/sidebar/admin/LoginAudit";
import Transaction from "../../pages/sidebar/transactions/Transaction";
import AdminAccount from "../../pages/sidebar/admin/AdminAccount";
import InventoryRequest from "../../pages/sidebar/inventory/InventoryRequest";
import InventoryRecords from "../../pages/sidebar/inventory/InventoryRecords";
import InventoryBorrow from "../../pages/sidebar/inventory/InventoryBorrow";
import IndigentBenefits from "../../pages/sidebar/indigent/IndigentBenefits";
import AdminAccountView from "../../pages/sidebar/admin/AdminAccountView";

import {
  AdminLayout,
  AnnouncementLayout,
  AuthLayout,
  BarangayOfficialLayout,
  BlotterLayout,
  CertificateLayout,
  ComplaintsLayout,
  HomepageLayout,
  IndigentLayout,
  InventoryLayout,
  ProfileLayout,
  ResidentLayout,
  RootLayout,
  SidebarLayout,
  SulatReklamoLayout,
  TransactionLayout,
} from "../layout/RouterLayout";
import CertificateRecords from "../../pages/sidebar/certificates/CertificateRecords";
import CertificatePending from "../../pages/sidebar/certificates/CertificatePending";
import CertificateRequest from "../../pages/sidebar/certificates/CertificateRequest";
import AnnouncementEdit from "../../pages/sidebar/announcement/AnnouncementEdit";
import SulatReklamo from "../../pages/sidebar/sulat-reklamo/SulatReklamo";
import SulatReklamoAdd from "../../pages/sidebar/sulat-reklamo/SulatReklamoAdd";
import BarangayOfficialEdit from "../../pages/sidebar/officials/BarangayOfficialEdit";
import Complaints from "../../pages/sidebar/complaints/Complaints";
import ComplaintsAdd from "../../pages/sidebar/complaints/ComplaintsAdd";
import ComplaintsEdit from "../../pages/sidebar/complaints/ComplaintsEdit";
import SulatReklamoEdit from "../../pages/sidebar/sulat-reklamo/SulatReklamoEdit";
import useAuthContext from "../../queries/auth/useAuthContext";
import BlotterAddNonResident from "../../pages/sidebar/blotter/BlotterAddNonResident";
import UnAuthorizedAccess from "../../pages/errors/UnAuthorizedAccess";
import ResidentLogin from "../../pages/auth/ResidentLogin";
import AdminLogin from "../../pages/auth/AdminLogin";
import Homepage from "../../pages/homepage/Homepage";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import ResetPassword from "../../pages/auth/ResetPassword";

export const rootRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* landing page */}
      <Route element={<HomepageLayout />}>
        <Route index element={<Homepage />} />
      </Route>

      {/* auth */}
      <Route path="portal/*" element={<AuthLayout />}>
        <Route index element={<Navigate to="resident" replace />} />
        <Route path="resident" element={<ResidentLogin />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route
          path="resident-signup"
          element={
            <div className="bg-[#1e1e2f] p-10">
              <ResidentAdd />
            </div>
          }
        />
      </Route>

      {/* sidebar */}
      <Route element={<SidebarLayout />}>
        {/* dashboard tab */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* announcement tab */}
        <Route element={<AnnouncementLayout />}>
          <Route path="announcement" element={<Announcement />} />
          <Route path="announcement/add" element={<AnnouncementAdd />} />
          <Route path="announcement/edit/:_id" element={<AnnouncementEdit />} />
        </Route>

        <Route element={<BarangayOfficialLayout />}>
          <Route path="officials" element={<BarangayOfficial />} />
          <Route path="officials/edit" element={<BarangayOfficialEdit />} />
        </Route>

        <Route element={<ResidentLayout />}>
          <Route path="resident" element={<Resident />} />
          <Route path="resident/add/" element={<ResidentAdd />} />
          <Route path="resident/view/:_id" element={<ResidentView />} />
        </Route>

        <Route element={<ProfileLayout />}>
          <Route path="resident/profile/:_id" element={<ResidentView />} />
        </Route>

        <Route element={<BlotterLayout />}>
          <Route path="blotter" element={<Blotter />} />
          <Route path="blotter/add/resident" element={<BlotterAdd />} />
          <Route
            path="blotter/add/non-resident"
            element={<BlotterAddNonResident />}
          />
          <Route path="blotter/edit/:_id" element={<BlotterEdit />} />
        </Route>

        <Route element={<ComplaintsLayout />}>
          <Route path="complaints" element={<Complaints />} />
          <Route path="complaints/add" element={<ComplaintsAdd />} />
          <Route path="complaints/edit/:_id" element={<ComplaintsEdit />} />
        </Route>

        <Route element={<SulatReklamoLayout />}>
          <Route path="sulat-reklamo/" element={<SulatReklamo />} />
          <Route path="sulat-reklamo/add" element={<SulatReklamoAdd />} />
          <Route
            path="sulat-reklamo/edit/:_id"
            element={<SulatReklamoEdit />}
          />
        </Route>

        <Route element={<CertificateLayout />}>
          <Route path="certificate" element={<CertificateRecords />} />
          <Route path="certificate/pending" element={<CertificatePending />} />
          <Route path="certificate/request" element={<CertificateRequest />} />
        </Route>

        <Route element={<InventoryLayout />}>
          <Route path="inventory" element={<InventoryRecords />} />
          <Route path="inventory/request" element={<InventoryRequest />} />
          <Route path="inventory/borrow" element={<InventoryBorrow />} />
        </Route>

        <Route element={<TransactionLayout />}>
          <Route path="transaction" element={<Transaction />} />
        </Route>

        <Route element={<IndigentLayout />}>
          <Route path="indigent-benefits" element={<IndigentBenefits />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="admin-account" element={<AdminAccount />} />
          <Route
            path="admin-account/view/:_id"
            element={<AdminAccountView />}
          />
          <Route path="admin-account/login-audit" element={<LoginAudit />} />
        </Route>
      </Route>

      {/* error */}
      <Route path="*" element={<NotFound />} />

      {/* unauthorized access */}
      <Route path="unauthorized" element={<UnAuthorizedAccess />} />
    </Route>
  )
);
