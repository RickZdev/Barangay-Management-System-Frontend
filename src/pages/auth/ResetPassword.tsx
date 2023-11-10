import React, { useEffect, useState } from "react";
import TextField from "../../components/TextField";
import CustomButton from "../../components/CustomButton";
import {
  changePassword,
  forgotPassword,
  resetPassword,
} from "../../services/apiHelper";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  noUserFoundNotify,
  tokenExpiredNotify,
} from "../../helper/toastNotifications";
import LoaderModal from "../../components/modals/loader/LoaderModal";
import useGetUserById from "../../queries/user/useGetUserById";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordFormValidation } from "../../utils/validation";
import SubmitButton from "../../components/SubmitButton";
import PasswordField from "../../components/PasswordField";
import ModalSuccess from "../../components/modals/alert/ModalSuccess";
import ModalFailed from "../../components/modals/alert/ModalFailed";
import BackButton from "../../components/BackButton";
import CardPhoto from "../../components/CardPhoto";
import BarangayLogo from "../../assets/logo/barangay-logo.png";
import { Card } from "flowbite-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id") ?? "";
  const token = searchParams.get("token") ?? "";

  const { data: user, isLoading: isUserLoading } = useGetUserById(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordFormValidation),
    mode: "onChange",
  });

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setIsProcessing(true);
    const res = await changePassword({
      userId: id,
      newPassword: data?.newPassword,
    });

    if (res) {
      setShowSuccessModal(true);
    } else {
      setShowErrorModal(true);
    }

    setIsProcessing(false);
  };

  const checkIfUserAndTokenValid = async () => {
    if (user?.data) {
      const data = await resetPassword({ id, token });
      if (data?.message === "error" && data?.error === "Token Expired") {
        navigate("/", { replace: true });
        tokenExpiredNotify();
      } else if (data?.message === "error") {
        navigate("/", { replace: true });
        tokenExpiredNotify();
      }
    } else {
      navigate("/", { replace: true });
      noUserFoundNotify();
    }
  };

  const isLoading = isUserLoading || isProcessing;

  useEffect(() => {
    if (!isLoading) {
      checkIfUserAndTokenValid();
    }
  }, [user]);

  return (
    <>
      <LoaderModal isLoading={isLoading} />
      <div className="loginForm-background">
        <Card className="w-[30%]">
          <div className="flex flex-row justify-center items-center space-x-2">
            <CardPhoto image={BarangayLogo} size={120} showTooltip={false} />

            <h1 className="uppercase text-3xl font-bold text-black">
              Barangay Navotas East Management System
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-3"
          >
            <PasswordField
              register={register("newPassword")}
              label="New Password"
              isEdit
              error={errors?.newPassword?.message}
            />

            <PasswordField
              register={register("confirmPassword")}
              label="Confirm Password"
              isEdit
              error={errors?.confirmPassword?.message}
            />

            <SubmitButton label="Reset Password" />
          </form>
        </Card>
      </div>

      <ModalSuccess
        open={showSuccessModal}
        title="Reset Password Successfully"
        description="You can now try to login your new password."
        buttonLabel="Back to Homepage"
        handleButtonPress={() => {
          navigate("/", { replace: true });
          setShowSuccessModal(false);
        }}
      />

      <ModalFailed
        open={showErrorModal}
        title="Reset Password Failed"
        description="There's an error resetting your password, please try again later."
        buttonLabel="Okay"
        handleButtonPress={() => setShowErrorModal(false)}
      />
    </>
  );
};

export default ResetPassword;
