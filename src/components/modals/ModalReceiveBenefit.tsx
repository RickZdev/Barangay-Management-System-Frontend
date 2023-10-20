import { Dialog, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import SelectField from "../SelectField";
import SELECTION from "../../constants/SELECTION";
import NumberField from "../NumberField";
import SearchableTextField from "../SearchableTextField";
import { ResidentPropType } from "../../utils/types";
import dayjs from "dayjs";
import useCreateTransaction from "../../queries/transaction/useCreateTransaction";
import { getResidentFullName } from "../../helper/getResidentFullName";
import { Close } from "@mui/icons-material";
import useAuthContext from "../../queries/auth/useAuthContext";
import TextField from "../TextField";
import useUpdateIndigentBenefit from "../../queries/indigentBenefit/useUpdateIndigentBenefit";

type ModalAddTransactionPropType = {
  indigentId: string | undefined;
  open: boolean;
  handleClose: () => void;
};

const ModalReceiveBenefit: React.FC<ModalAddTransactionPropType> = ({
  indigentId,
  open,
  handleClose,
}) => {
  const { register, handleSubmit } = useForm();
  const { mutate } = useUpdateIndigentBenefit(indigentId);

  const onSubmit = (event: any) => {
    handleClose();

    mutate({
      indigentBenefitId: indigentId,
      updatedData: {
        status: "Received",
        ...event,
      },
    });
  };

  return (
    <Dialog
      PaperProps={{ sx: { backgroundColor: "#29283d", borderRadius: 5 } }}
      onClose={handleClose}
      open={open}
      maxWidth={"xs"}
      fullWidth
      sx={{ borderRadius: 20 }}
    >
      <Card>
        <form
          className="space-y-4 flex flex-col bg-[#29283d] p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Tooltip
            arrow
            title="Close"
            sx={{ alignSelf: "flex-end" }}
            color="error"
            onClick={handleClose}
          >
            <IconButton>
              <Close color="error" />
            </IconButton>
          </Tooltip>
          <CardHeader title="Receive Benefit" isRequired />
          <h1>{indigentId}</h1>
          <TextField
            label="Receiver Name"
            isEdit
            register={register}
            name="receiver"
          />

          <TextField
            label="Relation Name"
            isEdit
            register={register}
            name="relation"
          />

          <div className="flex justify-end">
            <SubmitButton label="Submit" />
          </div>
        </form>
      </Card>
    </Dialog>
  );
};

export default ModalReceiveBenefit;
