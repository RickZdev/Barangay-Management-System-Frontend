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
import IMAGES from "../constants/IMAGES";
import { useNavigate } from "react-router-dom";
import useLogout from "../queries/auth/useLogout";
import CardPhoto from "./CardPhoto";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SettingsIcon from "@mui/icons-material/Settings";
import FaceIcon from "@mui/icons-material/Face";

const AccountMenu = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const { data: resident, isLoading } = useGetResidentById(auth?.userId);

  const logoutUser = useLogout();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const backgroundColor = "#1e1e2f";

  const handleLogout = () => {
    logoutUser();
    navigate("/", { replace: true });
  };

  const handleViewProfile = () => {
    navigate(`/resident/profile/${auth?.userId}`);
    setIsAccordionOpen(false);
  };

  return (
    <Accordion
      sx={{
        backgroundColor: "white",
        boxShadow: !isAccordionOpen
          ? "none"
          : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
      }}
      expanded={isAccordionOpen}
      onChange={() => setIsAccordionOpen(!isAccordionOpen)}
    >
      <AccordionSummary
        sx={{
          backgroundColor: backgroundColor,
          height: 80,
        }}
        expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
      >
        <div className="flex-row flex cursor-pointer justify-center items-center">
          <Avatar
            alt={resident?.firstName ?? "Resident"}
            src={resident?.profilePhoto ?? IMAGES.DefaultUserAvatar}
          />
          <div className="px-4 pr-2">
            {resident && (
              <>
                <Typography
                  noWrap
                  variant="h2"
                  fontSize={14}
                  fontWeight="bold"
                  color={"white"}
                  width={180}
                >
                  {resident?.fullName}
                </Typography>
                <Typography variant="h6" fontSize={12} color={"white"}>
                  {auth?.userRole}
                </Typography>
              </>
            )}
          </div>
        </div>
      </AccordionSummary>
      <div
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
        }}
      >
        <div>
          <CardPhoto
            image={resident?.profilePhoto ?? ""}
            showTooltip={false}
            size={120}
          />

          <div className="text-center py-5">
            <Typography fontWeight={"bold"}>{resident?.fullName}</Typography>
            <Typography fontSize={14}>{auth?.userRole}</Typography>
          </div>

          <div
            onClick={handleViewProfile}
            className="flex flex-row justify-between px-4 py-3 cursor-pointer hover:bg-[rgb(242,242,242)]"
          >
            <div className="flex-row flex space-x-3">
              <FaceIcon sx={{ color: "black" }} />
              <Typography fontSize={14} fontWeight={"bold"}>
                View Profile
              </Typography>
            </div>

            <ChevronRightIcon sx={{ color: "black" }} />
          </div>

          <div className="flex flex-row justify-between px-4 py-3 cursor-pointer hover:bg-[rgb(242,242,242)]">
            <div className="flex-row flex space-x-3">
              <SettingsIcon sx={{ color: "black" }} />
              <Typography fontSize={14} fontWeight={"bold"}>
                Settings
              </Typography>
            </div>

            <ChevronRightIcon sx={{ color: "black" }} />
          </div>

          <div
            onClick={handleLogout}
            className="flex flex-row justify-between px-4 py-3 cursor-pointer hover:bg-[rgb(242,242,242)]"
          >
            <div className="flex-row flex space-x-3">
              <LogoutIcon sx={{ color: "black" }} />
              <Typography fontSize={14} fontWeight={"bold"}>
                Signout
              </Typography>
            </div>

            <ChevronRightIcon sx={{ color: "black" }} />
          </div>
        </div>
      </div>
    </Accordion>
  );
};

export default AccountMenu;