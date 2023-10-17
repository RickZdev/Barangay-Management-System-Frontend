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

type ModalAddTransactionPropType = {
  open: boolean;
  handleClose: () => void;
};

const ModalAddTransaction: React.FC<ModalAddTransactionPropType> = ({
  open,
  handleClose,
}) => {
  const { register, handleSubmit } = useForm();
  const { mutate } = useCreateTransaction();
  const auth = useAuthContext();

  const [residentDetails, setResidentDetails] = useState<
    ResidentPropType | undefined
  >();

  const handleChange = (resident: ResidentPropType | undefined) => {
    setResidentDetails(resident);
  };

  const generateReceiptNumber = () => {
    const timestamp = new Date().getTime(); // get current timestamp
    const randomNumber = Math.floor(Math.random() * 1000000); // generate random number between 0 and 999999
    const receiptNumber = `#${timestamp}-${randomNumber}`; // concatenate timestamp and random number
    return receiptNumber;
  };

  const onSubmit = (event: any) => {
    handleClose();
    const receiptNumber = generateReceiptNumber();
    const residentFullName = getResidentFullName({
      lastName: residentDetails?.lastName,
      firstName: residentDetails?.firstName,
      middleName: residentDetails?.middleName,
      suffix: residentDetails?.suffix,
    });

    mutate({
      residentId: residentDetails?._id,
      residentName: residentFullName,
      transactionDateAndTime: dayjs().format("MM/DD/YYYY - HH:mm A"),
      transactionReceiptNumber: receiptNumber,
      officialInCharge: auth?.userRole,
      ...event,
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
          <CardHeader title="Make Transaction" />
          <SearchableTextField
            label="Resident Name"
            isEdit
            handleChange={handleChange}
          />

          <SelectField
            label="Transaction Type"
            isEdit
            selections={SELECTION.transactionTypeSelection}
            register={register("transactionType")}
          />

          <NumberField
            label="Payment Amount"
            isEdit
            register={register("amount")}
          />

          <div className="flex justify-end">
            <SubmitButton label="Submit" />
          </div>
        </form>
      </Card>
    </Dialog>
  );
};

export default ModalAddTransaction;
