import { Avatar, Dialog, IconButton, Tooltip } from "@mui/material";
import React from "react";
import Card from "../../Card";
import SubmitButton from "../../SubmitButton";
import { useForm } from "react-hook-form";

import { Close } from "@mui/icons-material";
import CustomButton from "../../CustomButton";
import SuccessLogo from "../../../assets/logo/success-logo.png";

type ModalSuccessPropType = {
  open: boolean;
  title: string;
  description?: string;
  buttonLabel?: string;
  handleButtonPress: () => void;
};

const ModalSuccess: React.FC<ModalSuccessPropType> = ({
  open,
  title,
  description,
  buttonLabel,
  handleButtonPress,
}) => {
  return (
    <Dialog
      PaperProps={{
        sx: {
          backgroundColor: "#29283d",
          borderRadius: 5,
        },
      }}
      open={open}
      maxWidth={"sm"}
      fullWidth
    >
      <Card className="flex-col flex justify-center items-center">
        <div className="flex flex-1  justify-center items-center mb-5">
          <Avatar
            alt="Success"
            src={SuccessLogo}
            sx={{ width: 120, height: 120 }}
          />
        </div>

        <div className="justify-center items-center flex flex-col pb-14">
          <h6
            className="font-poppins text-[#ffffffcc] uppercase text-center"
            style={{ fontSize: 25 }}
          >
            {title}
          </h6>

          {description && (
            <p className="font-poppins text-[#ffffffcc] text-[14px] text-center">
              {description}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <CustomButton label={buttonLabel ?? ""} onClick={handleButtonPress} />
        </div>
      </Card>
    </Dialog>
  );
};

export default ModalSuccess;
