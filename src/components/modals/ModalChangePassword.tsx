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
import { changePasswordFormValidation } from "../../utils/validation";
import PasswordField from "../PasswordField";
import { NavLink, useNavigate } from "react-router-dom";
import { changePassword } from "../../services/apiHelper";
import useAuthContext from "../../queries/auth/useAuthContext";
import ModalSuccess from "./alert/ModalSuccess";
import ModalFailed from "./alert/ModalFailed";
import LoaderModal from "./loader/LoaderModal";

type ModalChangePasswordPropType = {
  open: boolean;
  handleClose: () => void;
};

const ModalChangePassword: React.FC<ModalChangePasswordPropType> = ({
  open,
  handleClose,
}) => {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const {
    register,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(changePasswordFormValidation) });

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const clearValues = () => {
    setValue("currentPassword", "");
    setValue("newPassword", "");
    setValue("confirmPassword", "");
  };

  const onSubmit = async (data: any) => {
    setIsProcessing(true);
    const res = await changePassword({
      userId: auth?.userId ?? "",
      currentPassword: data?.currentPassword,
      newPassword: data?.newPassword,
    });

    if (res.data) {
      setShowSuccessModal(true);
      clearValues();
      handleClose();
    } else if (res.error === "Incorrect Password") {
      setShowErrorModal(true);
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    clearValues();
  }, []);

  return (
    <>
      <LoaderModal isLoading={isProcessing} />
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
            className="space-y-5 flex flex-col bg-[#29283d] p-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Tooltip
              arrow
              title="Close"
              sx={{ alignSelf: "flex-end" }}
              color="error"
              onClick={() => {
                clearValues();
                clearErrors();
                handleClose();
              }}
            >
              <IconButton>
                <Close color="error" />
              </IconButton>
            </Tooltip>

            <CardHeader title="Change Password" />

            <PasswordField
              label="Current Password"
              isEdit
              register={register("currentPassword")}
              error={errors?.currentPassword?.message}
            />

            <PasswordField
              label="New Password"
              isEdit
              register={register("newPassword")}
              error={errors?.newPassword?.message}
            />

            <PasswordField
              label="Confirm Password"
              isEdit
              register={register("confirmPassword")}
              error={errors?.confirmPassword?.message}
            />

            <div className="relative">
              <div
                onClick={() => navigate("portal/forgot-password")}
                className="absolute"
              >
                <p className="font-poppins text-sm text-blue-600 cursor-pointer">
                  Forgot Password?
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <SubmitButton label="Submit" />
            </div>
          </form>
        </Card>
      </Dialog>

      <ModalSuccess
        open={showSuccessModal}
        title="Change Password Successfully"
        description="You can now login your account with your new password."
        buttonLabel="Back to Screen"
        handleButtonPress={() => setShowSuccessModal(false)}
      />

      <ModalFailed
        open={showErrorModal}
        title="Change Password Failed"
        description="Incorrect Password. Please try again."
        buttonLabel="Okay"
        handleButtonPress={() => setShowErrorModal(false)}
      />
    </>
  );
};

export default ModalChangePassword;
