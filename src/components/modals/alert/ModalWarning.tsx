import { Avatar, Dialog, IconButton, Tooltip } from "@mui/material";
import React from "react";
import Card from "../../Card";
import SubmitButton from "../../SubmitButton";
import { useForm } from "react-hook-form";

import { Close } from "@mui/icons-material";
import CustomButton from "../../CustomButton";
import WarningLogo from "../../../assets/logo/warning-logo.png";

type ModalWarningPropType = {
  open: boolean;
  title: string;
  description?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  handlePrimaryButton: () => void;
  handleSecondaryButton: () => void;
};

const ModalWarning: React.FC<ModalWarningPropType> = ({
  open,
  title,
  description,
  primaryButtonLabel,
  secondaryButtonLabel,
  handlePrimaryButton,
  handleSecondaryButton,
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
            src={WarningLogo}
            sx={{ width: 120, height: 120 }}
          />
        </div>

        <div className="justify-center items-center flex flex-col pb-14">
          <h6
            className="text-black uppercase text-center"
            style={{ fontSize: 32 }}
          >
            {title}
          </h6>

          {description && (
            <p className="font-poppins text-secondary font-bold text-[14px] text-center">
              {description}
            </p>
          )}
        </div>

        <div className="flex gap-4 justify-end">
          <CustomButton
            label={primaryButtonLabel ?? ""}
            onClick={handlePrimaryButton}
            backgroundColor="red"
          />
          <CustomButton
            label={secondaryButtonLabel ?? ""}
            onClick={handleSecondaryButton}
          />
        </div>
      </Card>
    </Dialog>
  );
};

export default ModalWarning;
