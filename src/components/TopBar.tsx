import React, { useEffect, useState } from "react";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import useAuthContext from "../queries/auth/useAuthContext";
import useGetResidentById from "../queries/resident/useGetResidentById";
import { getResidentFullName } from "../helper/getResidentFullName";
import useLogout from "../queries/auth/useLogout";

const TopBar: React.FC = () => {
  const auth = useAuthContext();
  const { data: resident, isLoading } = useGetResidentById(auth?.userId);
  const handleLogout = useLogout();
  // dark mode
  const backgroundColor = "#1e1e2f";

  // light mode
  // const backgroundColor = '#e27c39'

  const location = useLocation();
  const [firstPath, setFirstPath] = useState<string | undefined>();

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    setFirstPath(currentPath);
  }, [location]);

  return (
    <div className="flex justify-between flex-row items-center">
      {/* title page */}
      <h1 className="text-white text-3xl pl-8 uppercase font-extrabold">
        {firstPath}
      </h1>

      {/* top bar details */}
      <div
        className="flex justify-end items-center py-8 px-10 z-50"
        style={{
          backgroundColor: backgroundColor,
          // boxShadow:
          //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.05)",
          // filter: "drop-shadow",
        }}
      >
        <div className="px-8 space-x-4 flex">
          <DarkModeOutlinedIcon className="text-white" />
          <div className="relative flex justify-end">
            <NotificationsOutlinedIcon className="text-white" />
            <div className="w-3 h-3 rounded-full bg-green-500 absolute top-0.5 border-[2px] border-[#fff]" />
          </div>
        </div>
        <Avatar alt="Natashia" src="/src/assets/images/fred.jpg" />
        <div className="px-6">
          {resident && (
            <>
              <Typography
                noWrap
                variant="h3"
                fontSize={16}
                fontWeight="bold"
                color={"white"}
              >
                {getResidentFullName({
                  lastName: resident?.lastName,
                  firstName: resident?.firstName,
                  middleName: resident?.middleName,
                  suffix: resident?.suffix,
                })}
              </Typography>
              <Typography variant="h6" fontSize={14} color={"white"}>
                {auth?.userRole}
              </Typography>
            </>
          )}
        </div>
        <NavLink to={"/"} onClick={handleLogout}>
          <ExpandMoreIcon className="text-white" />
        </NavLink>
      </div>
    </div>
  );
};

export default TopBar;
