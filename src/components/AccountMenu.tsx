import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useGetResidentById from "../queries/resident/useGetResidentById";
import useAuthContext from "../queries/auth/useAuthContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DefaultUserAvatar from "../assets/images/default-user-avatar.png";
import { useNavigate } from "react-router-dom";
import useLogout from "../queries/auth/useLogout";
import CardPhoto from "./CardPhoto";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from "@mui/icons-material/Settings";
import FaceIcon from "@mui/icons-material/Face";
import LockIcon from "@mui/icons-material/Lock";
import { logoutSuccessNotify } from "../helper/toastNotifications";
import ModalChangePassword from "./modals/ModalChangePassword";
import { getResidentFullNameAsc } from "../helper/getResidentFullNameAsc";
import CustomButton from "./CustomButton";
import LoaderModal from "./modals/loader/LoaderModal";

const AccountMenu = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const { data: resident, isLoading } = useGetResidentById(auth?.userId);

  const logoutUser = useLogout();

  const [showChangePassModal, setShowChangePassModal] =
    useState<boolean>(false);

  const handleLogout = () => {
    logoutUser();

    if (auth?.userRole === "Resident") {
      navigate("/portal/resident", { replace: true });
    } else {
      navigate("/portal/admin", { replace: true });
    }

    logoutSuccessNotify();
  };

  const handleViewProfile = () => {
    navigate(`/resident/profile/${auth?.userId}`);
  };

  const handleChangePassword = () => {
    setShowChangePassModal(true);
  };

  return (
    <>
      <LoaderModal isLoading={isLoading} />

      <div
        style={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <div className="pt-10">
          <CardPhoto
 image={
  resident?.profilePhoto === ""
    ? DefaultUserAvatar
    : resident?.profilePhoto ?? ""
}            showTooltip={false}
            size={100}
          />
          <div className="text-center py-5">
            <Typography fontWeight={"bold"}>{resident?.fullName}</Typography>
            <Typography fontSize={14}>{auth?.userRole}</Typography>
          </div>

          {auth?.userRole === "Resident" && (
            <>
              <div
                onClick={handleViewProfile}
                className="flex flex-row justify-between px-4 py-3 cursor-pointer "
              >
                <div
                  className="flex-row flex space-x-3 items-center font-bold text-xs "
                  style={{
                    backgroundColor: "transparent",
                    padding: 0,
                    margin: 0,
                    marginLeft: 20,
                    marginRight: 10,
                  }}
                >
                  <FaceIcon
                    sx={{ color: "rgb(212, 212, 212)" }}
                    className=" hover:text-white "
                  />
                  <Typography
                    fontSize={12}
                    fontWeight={"bold"}
                    className="text-neutral-300 hover:text-white "
                  >
                    View Profile
                  </Typography>
                </div>

                <ChevronRightIcon
                  sx={{ color: "white", fontSize: 14, fontWeight: "700" }}
                />
              </div>

              <div
                onClick={handleChangePassword}
                className="flex flex-row justify-between px-4 py-3 cursor-pointer hover:text-white"
              >
                <div
                  className="flex-row flex space-x-3 items-center font-bold text-xs "
                  style={{
                    backgroundColor: "transparent",
                    padding: 0,
                    margin: 0,
                    marginLeft: 20,
                    marginRight: 10,
                  }}
                >
                  <LockIcon sx={{ color: "rgb(212, 212, 212)" }} />
                  <Typography
                    fontSize={12}
                    fontWeight={"bold"}
                    className="text-neutral-300 hover:text-white "
                  >
                    Change Password
                  </Typography>
                </div>

                <ChevronRightIcon
                  sx={{ color: "white", fontSize: 14, fontWeight: "700" }}
                />
              </div>
            </>
          )}

          <div
            onClick={handleLogout}
            className="flex flex-row justify-between px-4 py-3 cursor-pointer hover:text-white"
          >
            <div
              className="flex-row flex space-x-3 items-center "
              style={{
                backgroundColor: "transparent",
                padding: 0,
                margin: 0,
                marginLeft: 20,
                marginRight: 10,
              }}
            >
              <LogoutIcon sx={{ color: "rgb(212, 212, 212)" }} />
              <Typography
                fontSize={12}
                fontWeight={"bold"}
                className="text-neutral-300 hover:text-white "
              >
                Signout
              </Typography>
            </div>

            <ChevronRightIcon
              sx={{ color: "white", fontSize: 14, fontWeight: "700" }}
            />
          </div>
        </div>
      </div>

      <ModalChangePassword
        open={showChangePassModal}
        handleClose={() => setShowChangePassModal(false)}
      />
    </>
  );
};

export default AccountMenu;
