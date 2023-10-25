import React, { useEffect, useState } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Typography,
} from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuthContext from "../queries/auth/useAuthContext";
import useGetResidentById from "../queries/resident/useGetResidentById";
import { getResidentFullName } from "../helper/getResidentFullName";
import useLogout from "../queries/auth/useLogout";
import IMAGES from "../constants/IMAGES";
import AccountMenu from "./AccountMenu";

const TopBar: React.FC = () => {
  // dark mode
  const backgroundColor = "#1e1e2f";

  // light mode
  // const backgroundColor = '#e27c39'

  const location = useLocation();

  const [firstPath, setFirstPath] = useState<string | undefined>();
  const currentPath = location.pathname.split("/")[1];

  // useEffect(() => {
  //   const currentPath = location.pathname.split("/")[1];
  //   setFirstPath(currentPath);
  // }, [location]);

  return (
    <div className="flex justify-between flex-row items-center">
      {/* title page */}
      <h1 className="text-white text-3xl pl-8 uppercase font-extrabold">
        {currentPath}
      </h1>

      {/* top bar details */}
      <div
        className="flex justify-end items-center py-8 px-10 z-50 relative"
        style={{
          backgroundColor: backgroundColor,
          // boxShadow:
          //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
          // filter: "drop-shadow",
        }}
      >
        <div className="px-6 space-x-4 flex">
          <div className="relative flex justify-end">
            <NotificationsOutlinedIcon className="text-white" />
            <div className="w-3 h-3 rounded-full bg-green-500 absolute top-0.5 border-[2px] border-[#fff]" />
          </div>
        </div>

        <div className="absolute top-2">
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
