import React from "react";
import { Dialog } from "@mui/material";
import { Rings } from "react-loader-spinner";

type LoaderModalPropType = {
  isLoading: boolean;
};

const LoaderModal: React.FC<LoaderModalPropType> = ({ isLoading }) => {
  return (
    <Dialog
      PaperProps={{
        sx: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      open={isLoading}
      maxWidth={"sm"}
      fullWidth
    >
      <div className="flex flex-1 justify-center items-center">
        <Rings
          height="80"
          width="80"
          color="#067D68"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={isLoading}
          ariaLabel="rings-loading"
        />
      </div>
    </Dialog>
  );
};

export default LoaderModal;
