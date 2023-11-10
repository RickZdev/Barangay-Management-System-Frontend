import React, { useEffect, useState } from "react";
import "./styles.css";
import CardPhoto from "../../components/CardPhoto";
import BarangayLogo from "../../assets/logo/barangay-logo.png";
import { useNavigate } from "react-router";
import useAuthContext from "../../queries/auth/useAuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormValidation } from "../../utils/validation";
import useLogin from "../../queries/auth/useLogin";
import useLoginTimer from "../../hooks/useLoginTimer";
import { loginSuccessNotify } from "../../helper/toastNotifications";
import BackButton from "../../components/BackButton";
import SubmitButton from "../../components/SubmitButton";
import { COLORS } from "../../constants/COLORS";
import CustomButton from "../../components/CustomButton";
import PasswordField from "../../components/PasswordField";
import TextField from "../../components/TextField";
import LoaderModal from "../../components/modals/loader/LoaderModal";
import ModalFailed from "../../components/modals/alert/ModalFailed";

const ResidentLogin = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormValidation) });

  const { mutateAsync, isLoading: isLoginLoading } = useLogin();
  const { storedTimer, onLoginSuccess, onLoginError } = useLoginTimer();

  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [showNotVerifiedModal, setShowNotVerifiedModal] =
    useState<boolean>(false);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const isLoading = isProcessing || isLoginLoading;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const onSubmit = async (values: any) => {
    setIsProcessing(true);

    const res = await mutateAsync({ ...values });

    if (res.data) {
      localStorage.setItem("userId", JSON.stringify(res.data._id)!);
      localStorage.setItem("userRole", JSON.stringify("Resident")!);
      localStorage.setItem("accessToken", JSON.stringify(res.data.token)!);

      auth.setUserId(res.data._id);
      auth.setUserRole("Resident");
      auth.setAccessToken(res.data.token);
      onLoginSuccess();

      console.log("User Logged In Successfully!");
      loginSuccessNotify("Resident");
      navigate("/dashboard", { replace: true });
    } else if (res.error === "Resident not verified yet.") {
      setShowNotVerifiedModal(true);
      onLoginSuccess();
    } else {
      setShowErrorModal(true);
      onLoginError();
    }

    setIsProcessing(false);
  };

  useEffect(() => {
    const token = localStorage?.getItem("accessToken")
      ? JSON.parse(localStorage?.getItem("accessToken")!)
      : null;

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="LoginForm loginForm-background">
      <LoaderModal isLoading={isLoading} />

      <div className={"container"} id="container">
        <div className="absolute flex flex-1 px-6 py-6 z-50">
          <BackButton handleNavigate={() => handleNavigation("/")} />
        </div>
        <div className="form-container sign-in-container bg-white justify-center flex items-center px-32 ">
          <form className="space-y-4 py-16" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-center items-center space-x-2">
              <CardPhoto image={BarangayLogo} size={120} showTooltip={false} />

              <h1 className="uppercase text-3xl font-bold text-black">
                Barangay Navotas East Management System
              </h1>
            </div>

            <TextField
              label="Username"
              placeholder="Enter your username"
              isEdit
              register={register("username")}
              error={errors?.username?.message}
            />
            <div className="mb-10">
              <PasswordField
                label="Password"
                placeholder="Enter your password"
                isEdit
                register={register("password")}
                error={errors?.password?.message}
              />
            </div>

            <div className="mt-5">
              <SubmitButton
                label="Sign In"
                isButtonDisabled={!!storedTimer}
                backgroundColor={COLORS.secondary}
              />

              {storedTimer && (
                <p className="text-secondary text-xs mt-5 font-bold text-center">
                  You have been locked out. You can try again after{" "}
                  {storedTimer}
                </p>
              )}
            </div>

            <div className="my-2">
              <div
                onClick={() => handleNavigation("/portal/forgot-password")}
                className="cursor-pointer"
              >
                <p className="text-black font-poppins text-center text-sm underline ">
                  Forgot your password?
                </p>
              </div>
            </div>

            <div className="my-2 flex flex-row items-center space-x-3 pt-10 justify-center">
              <p className="text-black font-poppins text-center">
                Don't have an account?
              </p>

              <CustomButton
                label="REGISTER"
                backgroundColor={COLORS.secondary}
                onClick={() => handleNavigation("/portal/resident-signup")}
              />
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <CardPhoto image={BarangayLogo} size={300} showTooltip={false} />
              <h1 className="text-white uppercase font-bold text-[42px]">
                RESIDENT PORTAL
              </h1>
            </div>
          </div>
        </div>
      </div>

      <ModalFailed
        open={showErrorModal}
        title={!storedTimer ? "Login Failed" : "You have been locked out"}
        buttonLabel="Okay"
        description={
          !storedTimer
            ? "Your username or password is incorrect. Please try again."
            : "Please try again after 15 minutes."
        }
        handleButtonPress={() => setShowErrorModal(false)}
      />

      <ModalFailed
        open={showNotVerifiedModal}
        title={"Account Still Processing"}
        buttonLabel="Okay"
        description={
          "Your account still not verified. Please contact barangay official for more information."
        }
        handleButtonPress={() => setShowNotVerifiedModal(false)}
      />
    </div>
  );
};

export default ResidentLogin;
