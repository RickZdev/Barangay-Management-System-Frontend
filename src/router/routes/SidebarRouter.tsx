import { NavLink, useNavigate } from "react-router-dom";
import {
  Sidebar,
  useProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CampaignIcon from "@mui/icons-material/Campaign";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonIcon from "@mui/icons-material/Person";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ElderlyIcon from "@mui/icons-material/Elderly";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import GavelIcon from "@mui/icons-material/Gavel";
import { Add, Inventory, Visibility } from "@mui/icons-material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import useAuthContext from "../../queries/auth/useAuthContext";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { COLORS } from "../../constants/COLORS";

const SidebarRouter: React.FC = () => {
  const { collapseSidebar } = useProSidebar();

  const iconStyle = {
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
    marginLeft: 20,
    marginRight: 10,
  };

  const menuItemStyle = {
    ["." + menuClasses.button]: {
      "&:hover": {
        color: "white",
      },
    },
  };

  const navigate = useNavigate();

  // dark mode
  const gradientFirstColor = COLORS.secondary;
  const gradientSecondColor = COLORS.secondaryGold;
  const backgroundColor = COLORS.background;

  // light mode
  // const gradientFirstColor = "#e3ff73";
  // const gradientSecondColor = "#e27c39";
  // const backgroundColor = `rgb(243, 244, 248)`;

  const auth = useAuthContext();

  return (
    <>
      <div className="pl-8 pt-[125px]" style={{ background: backgroundColor }}>
        <Sidebar
          className="overflow-hidden rounded-md h-calc"
          style={{
            width: 75,
            borderWidth: 0,
            // background: "linear-gradient(0deg,#f04e23,#f7941d)",
            background: `linear-gradient(0deg, ${gradientFirstColor}, ${gradientSecondColor})`,
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            filter: "drop-shadow",
          }}
          backgroundColor="transparent"
          defaultCollapsed={true}
          collapsedWidth="75px"
          onMouseEnter={() => collapseSidebar()}
          onMouseLeave={() => collapseSidebar()}
        >
          <Menu className="font-bold text-xs text-white text-opacity-80">
            <MenuItem
              component={<NavLink to="/dashboard" />}
              icon={<DashboardIcon />}
              style={iconStyle}
              rootStyles={menuItemStyle}
            >
              Dashboard
            </MenuItem>
            {auth?.userRole !== "Resident" && (
              <SubMenu
                component={<NavLink to="/announcement" />}
                icon={<CampaignIcon />}
                style={iconStyle}
                rootStyles={menuItemStyle}
                label="Announcement"
              >
                <CustomMenuItem
                  Icon={Add}
                  onClick={() => navigate("/announcement/add/")}
                >
                  Add Announcement
                </CustomMenuItem>
              </SubMenu>
            )}
            <MenuItem
              icon={<SupervisorAccountIcon />}
              style={iconStyle}
              rootStyles={menuItemStyle}
              component={<NavLink to="/officials" />}
            >
              Barangay Officials
            </MenuItem>
            {auth?.userRole !== "Resident" && (
              <SubMenu
                icon={<PersonIcon />}
                style={iconStyle}
                component={<NavLink to="/resident" />}
                label="Resident"
              >
                <CustomMenuItem
                  Icon={Add}
                  onClick={() => navigate("/resident/add/")}
                >
                  Add Resident
                </CustomMenuItem>
                <CustomMenuItem
                  Icon={PendingActionsIcon}
                  onClick={() => navigate("/resident/pending/")}
                >
                  Pending Residents
                </CustomMenuItem>
              </SubMenu>
            )}

            {/* BLOTTER */}
            {auth?.userRole !== "Resident" ? (
              <SubMenu
                icon={<SummarizeIcon />}
                style={iconStyle}
                rootStyles={menuItemStyle}
                component={<NavLink to="/blotter" />}
                label="Blotter"
              >
                <CustomMenuItem
                  Icon={Add}
                  onClick={() => navigate("/blotter/add/resident")}
                >
                  Create Resident Blotter
                </CustomMenuItem>
                <CustomMenuItem
                  Icon={Add}
                  onClick={() => navigate("/blotter/add/non-resident")}
                >
                  Create Non-Resident Blotter
                </CustomMenuItem>
              </SubMenu>
            ) : (
              <MenuItem
                component={<NavLink to="/blotter" />}
                icon={<SummarizeIcon />}
                style={iconStyle}
                rootStyles={menuItemStyle}
              >
                Blotter
              </MenuItem>
            )}

            {/* COMPLAINTS */}
            {auth?.userRole !== "Resident" ? (
              <SubMenu
                icon={<AnnouncementIcon />}
                style={iconStyle}
                component={<NavLink to="/complaints" />}
                label="Complaints"
              >
                <CustomMenuItem
                  Icon={Add}
                  onClick={() => navigate("/complaints/add")}
                >
                  Create Complaints
                </CustomMenuItem>
              </SubMenu>
            ) : (
              <MenuItem
                component={<NavLink to="/complaints" />}
                icon={<AnnouncementIcon />}
                style={iconStyle}
                rootStyles={menuItemStyle}
              >
                Complaints
              </MenuItem>
            )}

            {/* SULAT REKLAMO */}
            {auth?.userRole !== "Resident" ? (
              <SubMenu
                icon={<GavelIcon />}
                style={iconStyle}
                rootStyles={menuItemStyle}
                component={<NavLink to="/sulat-reklamo" />}
                label="Sulat Reklamo"
              >
                <CustomMenuItem
                  Icon={Add}
                  onClick={() => navigate("/sulat-reklamo/add")}
                >
                  Create Sulat Reklamo
                </CustomMenuItem>
              </SubMenu>
            ) : (
              <MenuItem
                component={<NavLink to="/sulat-reklamo" />}
                icon={<GavelIcon />}
                style={iconStyle}
                rootStyles={menuItemStyle}
              >
                Sulat Reklamo
              </MenuItem>
            )}

            <SubMenu
              icon={<ContentPasteSearchIcon />}
              style={iconStyle}
              rootStyles={menuItemStyle}
              component={<NavLink to="/certificate" />}
              label="Certificates"
            >
              <CustomMenuItem
                Icon={ThumbDownIcon}
                onClick={() => navigate("/certificate/rejected")}
              >
                Rejected Certificates
              </CustomMenuItem>
              <CustomMenuItem
                Icon={PauseCircleOutlineIcon}
                onClick={() => navigate("/certificate/pending")}
              >
                Pending Certificates
              </CustomMenuItem>
            </SubMenu>

            <SubMenu
              icon={<InventoryIcon />}
              style={iconStyle}
              component={<NavLink to="inventory" />}
              label="Inventory"
            >
              <CustomMenuItem
                Icon={Inventory}
                onClick={() => navigate("/inventory/borrow")}
              >
                Borrowed Inventory
              </CustomMenuItem>
              {auth?.userRole !== "Resident" && (
                <CustomMenuItem
                  Icon={Add}
                  onClick={() => navigate("/inventory/request")}
                >
                  Request Inventory
                </CustomMenuItem>
              )}
            </SubMenu>
            <MenuItem
              icon={<ReceiptLongIcon />}
              style={iconStyle}
              component={<NavLink to="/transaction" />}
            >
              Transaction History
            </MenuItem>
            <MenuItem
              icon={<ElderlyIcon />}
              style={iconStyle}
              rootStyles={menuItemStyle}
              component={<NavLink to="/indigent-benefits" />}
            >
              Indigent Benefits
            </MenuItem>
            {auth?.userRole !== "Resident" && (
              <SubMenu
                icon={<VpnKeyIcon />}
                style={iconStyle}
                component={<NavLink to="/admin-account" />}
                label="Admin Account"
              >
                <CustomMenuItem
                  Icon={Visibility}
                  onClick={() => navigate("/admin-account/login-audit")}
                >
                  View Login Audit
                </CustomMenuItem>
              </SubMenu>
            )}
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

type CustomMenuItemPropType = {
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  children?: React.ReactNode;
};

const CustomMenuItem: React.FC<
  CustomMenuItemPropType &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = ({ Icon, children, ...props }) => {
  return (
    <div
      className="bg-[#29283d] flex flex-row justify-center items-center py-4 px-0 cursor-pointer hover:text-white text-ellipsis border-t-[1px] border-[#232537]"
      {...props}
    >
      {Icon && <Icon sx={{ marginRight: 1 }} />}
      <p className="text-ellipsis overflow-hidden whitespace-nowrap">
        {children}
      </p>
    </div>
  );
};

export default SidebarRouter;
