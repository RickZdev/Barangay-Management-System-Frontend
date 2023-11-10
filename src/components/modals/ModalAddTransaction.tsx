import { Dialog, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { transactionFormValidation } from "../../utils/validation";
import TextField from "../TextField";
import ModalSuccess from "./alert/ModalSuccess";
import LoaderModal from "./loader/LoaderModal";

type ModalAddTransactionPropType = {
  open: boolean;
  handleClose: () => void;
};

const ModalAddTransaction: React.FC<ModalAddTransactionPropType> = ({
  open,
  handleClose,
}) => {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transactionFormValidation),
  });
  const { mutateAsync } = useCreateTransaction();
  const auth = useAuthContext();

  const [isResidentTextEmpty, setIsResidentTextEmpty] = useState<boolean>(true);
  const [resident, setResident] = useState<ResidentPropType | undefined>();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const generateReceiptNumber = () => {
    const timestamp = new Date().getTime(); // get current timestamp
    const randomNumber = Math.floor(Math.random() * 1000000); // generate random number between 0 and 999999
    const receiptNumber = `#${timestamp}-${randomNumber}`; // concatenate timestamp and random number
    return receiptNumber;
  };

  const handleSuccess = () => {
    setShowSuccessModal(false);
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);

    const receiptNumber = generateReceiptNumber();
    const residentFullName = getResidentFullName({
      lastName: resident?.lastName,
      firstName: resident?.firstName,
      middleName: resident?.middleName,
      suffix: resident?.suffix,
    });

    await mutateAsync({
      residentId: resident?._id,
      residentName: residentFullName,
      transactionDateAndTime: dayjs().format("MM/DD/YYYY - HH:mm A"),
      transactionReceiptNumber: receiptNumber,
      officialInCharge: auth?.userRole,
      amount: data.paymentAmount,
      ...data,
    });

    setIsProcessing(false);
    setShowSuccessModal(true);

    setValue("residentName", "");
    setValue("paymentAmount", "");
    setValue("transactionType", "");
    setResident(undefined);
    handleClose();
  };

  // searchable field errors
  useEffect(() => {
    if (isResidentTextEmpty) {
      setValue(
        "residentName",
        getResidentFullName({
          lastName: resident?.lastName,
          firstName: resident?.firstName,
          middleName: resident?.middleName,
          suffix: resident?.suffix,
        })
      );

      clearErrors("residentName");
    } else {
      setValue("residentName", "");
      setError("residentName", { message: "This is a required field." });
    }
  }, [isResidentTextEmpty]);

  useEffect(() => {
    setValue("residentName", "");
    setValue("paymentAmount", "");
    setValue("transactionType", "");
  }, []);

  return (
    <>
      <LoaderModal isLoading={isProcessing} />

      <Dialog
        PaperProps={{ sx: { backgroundColor: "white", borderRadius: 5 } }}
        onClose={handleClose}
        open={open}
        maxWidth={"md"}
        fullWidth
        sx={{ borderRadius: 20 }}
      >
        <Card>
          <form
            className="space-y-4 flex flex-col bg-white p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Tooltip
              arrow
              title="Close"
              sx={{ alignSelf: "flex-end" }}
              color="error"
              onClick={() => {
                setValue("residentName", "");
                setValue("paymentAmount", "");
                setValue("transactionType", "");
                setResident(undefined);
                handleClose();
              }}
            >
              <IconButton>
                <Close color="error" />
              </IconButton>
            </Tooltip>
            <CardHeader title="Make Transaction" />

            <SearchableTextField
              label="Resident's Name"
              isEdit
              handleChange={setResident}
              handleIsEmptyText={setIsResidentTextEmpty}
              error={errors?.residentName?.message}
              autoFocus
            />

            <TextField
              label="Resident's Contact Number"
              value={resident?.contactNumber ?? ""}
              register={register("contactNumber")}
            />

            <SelectField
              label="Transaction Type"
              isEdit
              selections={SELECTION.transactionTypeSelection}
              register={register("transactionType")}
              error={errors?.transactionType?.message}
            />

            <NumberField
              label="Payment Amount"
              isEdit
              register={register("paymentAmount")}
              error={errors?.paymentAmount?.message}
            />

            <div className="flex justify-end">
              <SubmitButton label="Submit" />
            </div>
          </form>
        </Card>
      </Dialog>

      <ModalSuccess
        open={showSuccessModal}
        title="Transaction Complete"
        description="Your payment has been saved."
        buttonLabel="Back to Screen"
        handleButtonPress={handleSuccess}
      />
    </>
  );
};

export default ModalAddTransaction;
