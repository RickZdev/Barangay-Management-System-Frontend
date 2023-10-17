import { Tooltip } from "@mui/material";
import React from "react";

type CardPhotoPropType = {
  image: string;
  size?: number;
  showTooltip?: boolean;
  tooltip?: string;
};

const CardPhoto: React.FC<CardPhotoPropType> = ({
  image,
  size,
  tooltip,
  showTooltip = true,
}) => {
  return (
    <>
      {showTooltip ? (
        <Tooltip arrow title={tooltip ?? "Upload Picture"} color="error">
          <div className="flex flex-col items-center">
            <div
              className="rounded-full"
              style={{ width: size ?? 160, height: size ?? 160 }}
            >
              <img
                src={image}
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </Tooltip>
      ) : (
        <div className="flex flex-col items-center">
          <div
            className="rounded-full"
            style={{ width: size ?? 160, height: size ?? 160 }}
          >
            <img
              src={image}
              alt="User"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CardPhoto;
