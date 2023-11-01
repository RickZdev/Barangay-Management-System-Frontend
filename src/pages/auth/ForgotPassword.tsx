import React, { useState } from "react";
import TextField from "../../components/TextField";
import CustomButton from "../../components/CustomButton";
import { forgotPassword } from "../../services/apiHelper";
import SubmitButton from "../../components/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import ModalFailed from "../../components/modals/alert/ModalFailed";
import ModalSuccess from "../../components/modals/alert/ModalSuccess";
import useForgotPassword from "../../queries/auth/useForgotPassword";
import LoaderModal from "../../components/modals/loader/LoaderModal";

const ForgotPassword = () => {
  const { mutateAsync, isLoading } = useForgotPassword();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        emailAddress: Yup.string()
          .required("This is a required field.")
          .matches(
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "This field should be in email format."
          ),
      })
    ),
    mode: "onChange",
  });

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    try {
      const res = await mutateAsync({ emailAddress: data?.emailAddress });

      if (res.data) {
        setShowSuccessModal(true);
        resetField("emailAddress");
      } else if (res.message === "error") {
        setShowErrorModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoaderModal isLoading={isLoading} />
      <div className="flex flex-col justify-center items-center h-screen bg-[#1e1e2f]">
        <h1 className="text-white font-bold text-lg">Forgot Password</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3"
        >
          <TextField
            register={register("emailAddress")}
            label={"Email Address"}
            isEdit
            error={errors?.emailAddress?.message}
          />

          <SubmitButton label="Submit" />
        </form>
      </div>

      <ModalSuccess
        open={showSuccessModal}
        title="Check your Email"
        description="Reset Password Link already sent to your email."
        buttonLabel="Back to Screen"
        handleButtonPress={() => setShowSuccessModal(false)}
      />

      <ModalFailed
        open={showErrorModal}
        title="Forgot Password Failed"
        description="Email Address does not exist."
        buttonLabel="Try Again"
        handleButtonPress={() => setShowErrorModal(false)}
      />
    </>
  );
};

export default ForgotPassword;
