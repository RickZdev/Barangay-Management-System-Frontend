import { Dialog, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "../Card";
import CardHeader from "../CardHeader";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import { Close } from "@mui/icons-material";
import TextField from "../TextField";
import useUpdateIndigentBenefit from "../../queries/indigentBenefit/useUpdateIndigentBenefit";
import { yupResolver } from "@hookform/resolvers/yup";
import { indigentBenefitFormValidation } from "../../utils/validation";

type ModalReceiveBenefitPropType = {
  indigentId: string | undefined;
  open: boolean;
  handleClose: () => void;
};

const ModalReceiveBenefit: React.FC<ModalReceiveBenefitPropType> = ({
  indigentId,
  open,
  handleClose,
}) => {
  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(indigentBenefitFormValidation) });
  const { mutateAsync } = useUpdateIndigentBenefit();

  const onSubmit = async (data: any) => {
    await mutateAsync({
      indigentBenefitId: indigentId,
      updatedData: {
        status: "Received",
        receiver: data?.receiverName,
        relation: data?.relationName,
      },
    });

    setValue("receiverName", "");
    setValue("relationName", "");
    handleClose();
  };

  useEffect(() => {
    setValue("receiverName", "");
    setValue("relationName", "");
  }, []);

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
            onClick={() => {
              setValue("receiverName", "");
              setValue("relationName", "");
              clearErrors();
              handleClose();
            }}
          >
            <IconButton>
              <Close color="error" />
            </IconButton>
          </Tooltip>

          <CardHeader title="Receive Benefit" />

          <TextField
            label="Receiver's Name"
            isEdit
            register={register("receiverName")}
            error={errors?.receiverName?.message}
          />

          <TextField
            label="Relation to the Indigent"
            isEdit
            register={register("relationName")}
            error={errors?.relationName?.message}
          />

          {/* <Num */}

          <div className="flex justify-end">
            <SubmitButton label="Submit" />
          </div>
        </form>
      </Card>
    </Dialog>
  );
};

export default ModalReceiveBenefit;
