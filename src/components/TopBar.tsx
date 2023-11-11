import React from "react";
import useAuthContext from "../queries/auth/useAuthContext";
import { COLORS } from "../constants/COLORS";
import MenuIcon from "@mui/icons-material/Menu";
import { useProSidebar } from "react-pro-sidebar";

const TopBar: React.FC = () => {
  const auth = useAuthContext();
  const { collapseSidebar, collapsed } = useProSidebar();

  return (
    <div className="flex flex-row bg-white items-center justify-between px-5 sticky top-0 z-10 shadow-md">
      <div onClick={() => collapseSidebar()} className="cursor-pointer">
        <MenuIcon sx={{ color: COLORS.secondaryGold }} />
      </div>

      <div className=" bg-white">
        <div>
          {auth?.userRole === "Resident" ? (
            <h1 className="text-black text-3xl pl-8 uppercase font-extrabold text-center">
              Resident Portal
            </h1>
          ) : (
            <h1 className="text-black text-3xl pl-8 uppercase font-extrabold text-center">
              Admin Portal
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
