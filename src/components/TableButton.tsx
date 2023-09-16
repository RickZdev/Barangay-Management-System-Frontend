import { Button, SvgIconTypeMap } from "@mui/material";
import React from "react";
import { Link, To } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type TableButtonPropType = {
  path?: To;
  label: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  onClick?: () => void;
};

const TableButton: React.FC<TableButtonPropType> = ({
  path,
  label,
  Icon = AddIcon,
  onClick,
}) => {
  return (
    <Link to={path ?? ""}>
      <Button
        onClick={onClick}
        className="border-gray-500 bg-transparent rounded-lg space-x-1 w-full"
        sx={{
          border: "2px solid rgb(107,114,128)",
          paddingX: 3,
          paddingY: 1,
          color: "rgb(107,114,128)",
          ":hover": {
            border: "2px solid white",
            backgroundColor: "transparent",
            color: "white",
          },
        }}
      >
        <Icon className="text-sm text-inherit" fontSize="small" />
        <p className="text-sm capitalize font-poppins text-inherit">{label}</p>
      </Button>
    </Link>
  );
};

export default TableButton;
